# API - BackEnd Routes#

# API Authentification

To submit or view a post you need to signup or login into an account client.
The API run on the port :8000

# To signup

POST /api/auth/signup

exemple in JSON format:
{
"email":"myemail@provider.com",
"password":"MyB3stP@ssw0rd"
}

Exemple of a the response you get if good and unique email:

{
"message": "Utilisateur créé !"
}

# To logon

Exemple of a the response you get :
{
"userId": "630e1d8abb8ceda737a1ac59",
"token": "eyJhbGciOiJIkpXVCJ9.eywnb_Vn9hLMiMqsMY"
}
