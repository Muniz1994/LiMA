# Model Checker

## Folder structure

```python
LiMA/
├── backend/
│   ├── autentic/ # Django app for atentication
│   ├── backend/ 
│   ├── check_module/ # Python module to execute the verifications based on the digital regulations and the IFC modules
│   ├── digital_regulation/ # Django app that handles the digital regulation creation
│   ├── media/ # Folder to manae static files
│   ├── verification/ # Django app that handles the model checking
│   ├── Dockerfile 
│   ├── manage.py
│   └── requirements.txt
├── client/
│   ├── public/
│   ├── src/

│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── README.md
│   └── model_a.py # Contains a class to represent a model
├── .gitignore
├── docker-compose.yaml
└── README.md

```