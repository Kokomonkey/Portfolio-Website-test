import sqlite3
from langchain_community.utilities import SQLDatabase
from langchain_community.llms import Ollama
from langchain_experimental.sql import SQLDatabaseChain

# 1. SETUP: Connect to your existing database
# We tell the AI about the specific table structure so it knows what "price" and "co2" mean
db_path = "sqlite:///materials.db"
db = SQLDatabase.from_uri(db_path)

# 2. THE BRAIN: Connect to your local Ollama instance
# 'llama3' is the model ID. You can also use 'mistral' or 'phi3'
llm = Ollama(model="llama3", temperature=0)

# 3. THE LOGIC: Create the Chain
# This chain takes your text -> writes SQL -> executes SQL -> reads answer -> replies in English
db_chain = SQLDatabaseChain.from_llm(llm, db, verbose=True)

# 4. INTERFACE: Simple loop to chat
def chat_session():
    print("🧠 LOCAL ARCHITECT BRAIN ONLINE (Type 'exit' to quit)")
    print("-----------------------------------------------------")
    
    while True:
        user_input = input("\nYou: ")
        if user_input.lower() in ['exit', 'quit']:
            break
            
        try:
            # We force a prompt template to make it act like an Architect
            prompt = f"""
            Given the following user question, look up the data in the 'materials' table.
            The table has columns: name, manufacturer, thickness_mm, gwp_co2, price_m2, fire_rating.
            
            Question: {user_input}
            
            Return a concise architectural answer.
            """
            
            response = db_chain.invoke(prompt)
            
            # The chain returns a dict, we just want the 'result'
            print(f"🤖 AI: {response['result']}")
            
        except Exception as e:
            print(f"⚠️ Error: {e}")
            print("Tip: The model might have tried to write invalid SQL. Try a simpler question.")

if __name__ == "__main__":
    chat_session()