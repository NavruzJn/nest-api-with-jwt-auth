# nest-api-with-jwt-auth

Instructions to launch
1. npm install
2. Create db on local mysql
3. Create config.ts and ormconfig.json as in example files
4. Launch the app


Examples of API:
1. To get token
POST: {{url}}/api/users 
Body: {
    user: {"username":"your-name"}
}
2. Access to currencies:
Get api/currencies
3. Insert currencies to currency table run script on command line:
npm run db currency
