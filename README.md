# Base Project Structure for NestJS Application

## Steps

1. Create project folder

```bash
 nest new my-blog-api
```

```bash
 cd my-blog-api
```

2. Create a new controller

```bash
 nest generate controller users
```

```bash
 nest generate controller posts/controllers/categories --flat
```

3. Validator for user creation

```bash
 npm i --save class-validator class-transformer
```

4. Create a service

```bash
 nest generate service users
```

```bash
 nest generate service posts/services/categories --flat
```

5. Create a module

````bash
   nest generate module users
   ```

5. Create a resource

```bash
 nest generate resource posts
   ```

Extras

```bash
 npm run format
````
