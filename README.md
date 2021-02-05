# Udagram Image Filtering Microservice

<img width="100%" alt="Skjermbilde 2021-01-14 kl  20 39 52" src="https://user-images.githubusercontent.com/16366210/104640402-bb315900-56a8-11eb-9b41-e47c28d8eb73.png">

## Project objective

Submit an application to AWS Elastic Beanstalk.

## Course details - Full Stack Apps on AWS

[Cloud Developer - NANODEGREE PROGRAM](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990)

> _In this project, you will develop a cloud-based application for uploading, listing, and filtering images. You will use Node.js/Express, a popular Javascript framework for networked application development. You will implement a REST API to issue commands using HTTP, store data in Amazon Web Services Relational Data Service (RDS) and S3, extend the codebase with secure authentication signon features, and deploy to Amazon Web Services Elastic Beanstalk. These are the hard skills you’ll need in any Cloud developer role._

## Development

```bash
npm install
```

```bash
npm run dev
```

### Running locally

| Path                                                        | Description            |
| ----------------------------------------------------------- | ---------------------- |
| http://localhost:8082/                                      | _friendly message_     |
| http://localhost:8082/filteredimage?image_url=<PATH_TO_IMG> | _image filter enpoint_ |

#### Postman

Import `cloud-cdnd-c2-final.postman_collection.json` in [Postman](https://www.postman.com/downloads/) if you want a better development experience.

## Production

Builds the project inside `www` and create a zip named `Archive` inside it.

```bash
npm run build
```
