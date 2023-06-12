from flask import Flask, request
from flask_restful import Resource, Api
from flask_swagger_ui import get_swaggerui_blueprint
import os

# Импорт других нужных библиотек и классов

app = Flask(__name__)
api = Api(app)

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.json'  # Our API url (can of course be a local resource)

# Call factory function to create our blueprint
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Python Flask RESTful API with Swagger UI"
    },
)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


class QueryAPI(Resource):
    def post(self):
        file = request.files['document']
        question = request.form['question']

        os.environ["OPENAI_API_KEY"] = ""

        # Load and split the document
        loader = PyPDFLoader(file.read())
        chunks = loader.load_and_split()

        embeddings = OpenAIEmbeddings()
        db = FAISS.from_documents(chunks, embeddings)

        qa = ConversationalRetrievalChain.from_llm(OpenAI(temperature=0.1), db.as_retriever())
        chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")

        docs = db.similarity_search(question)

        return {'answer': chain.run(input_documents=docs, question=question)}


api.add_resource(QueryAPI, '/api/query')

if __name__ == '__main__':
    app.run(debug=True)
