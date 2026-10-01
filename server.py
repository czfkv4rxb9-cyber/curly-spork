from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent
os.chdir(ROOT)

server = ThreadingHTTPServer(("0.0.0.0", 8000), SimpleHTTPRequestHandler)
print("Откройте: http://localhost:8000")
server.serve_forever()
