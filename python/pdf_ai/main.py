import os
from flask import Flask, request, jsonify
from flasgger import Swagger
from werkzeug.utils import secure_filename

# Импорт классов из библиотеки langchain, примечание: эти библиотеки должны быть установлены в вашем окружении
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.chains import ConversationalRetrievalChain

#os.environ["OPENAI_API_KEY"] = ""
app = Flask(__name__)
swagger = Swagger(app)

@app.route('/api/query', methods=['POST'])
def answer_query():
    """
    Answer a question based on a document
    This endpoint accepts a file and a question and returns an answer based on the content of the file.
    ---
    parameters:
      - name: document
        in: formData
        type: file
        required: true
      - name: question
        in: formData
        type: string
        required: true
    responses:
      200:
        description: Answer successfully generated
        schema:
          type: object
          properties:
            answer:
              type: string
              description: The answer to the question
    """
    # Сохраняем файл и вопрос
    file = request.files['document']
    question = request.form.get('question')

    # Загрузите и разбейте PDF
    file_path = secure_filename(file.filename)
    file.save(file_path)
    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    chunks = pages

    # Создайте векторное пространство для хранения эмбеддингов документов
    embeddings = OpenAIEmbeddings()
    db = FAISS.from_documents(chunks, embeddings)

    # Создайте объекты для генерации ответа на вопрос
    qa = ConversationalRetrievalChain.from_llm(OpenAI(temperature=0.1), db.as_retriever())
    chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")

    # Получите документы, похожие на вопрос, и сгенерируйте ответ на вопрос
    docs = db.similarity_search(question)
    response = chain.run(input_documents=docs, question=question)

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
