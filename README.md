# Mock Stats Service

## Assumptions:
- Requests with no 'X-User-Id' header response Unauthorized (401)
- GET requests with a user, course, or session that is not in the system yet response Not Found (404)
- Aggregating stats for a course is calculated as follows:
    - totalModulesStudied as the sum of all session totalModulesStudied;
    - timeStudied as the sum of all session timeStudied;
    - averageScore as a weighted average, ie, the sum of averageScore * totalModulesStudied divided by the sum of all session totalModulesStudied.

## Testing with Postman:
- Install Postman.
- Import collection from *'postman-tests/Stats Service.postman_collection.js'*.
- Add variables to Postman. The easiest way is to import them from *'postman-tests/My Workspace.postman_globals.json'* or they can be added manually. Variables needed:
    - session01: uuid for a session. For example: s3550n-0ab1-session01
    - session02: uuid for another session. For example: s3550n-0ab2-session02
    - course1: uuid for a course. For example: c0ur53-0cc1-course01
    - user1: uuid for a user. For example us3r00-alba-user01
    - baseUrl: host or base url of the service. For example http://localhost:3000
- Note: Variables can be added as global variables, but make sure other scope variables don't override them.
- Make sure the service is up and running, locally, or on AWS.
- Click on *'Runner'*. Select the collection imported, Stats Service, and run it by clicking on *'Run Stats Service'*.
-**Note**: Tests will fail if we run them on the same server several times, mostly because of the aggregated stats.

## Run Locally
- Navigate to the src folder and type in the terminal: 
  ```
  npm install
  node index.js
  ```

## Run on AWS
- Install Terraform.
- Create a user with Administrator access on AWS:
    - Navigate to the IAM service.
    - Create a new user for Terraform.
    - Give it *'Programmatic Access'*.
    - On the *'set permissions'* section, select *'Attach existing policies directly'* and give it AdministratorAccess.
    - Create the user.
    - Copy the user's *'Access Key ID'* and *'Secret Access Key'*. This data may not be accessable anymore.
- Copy the user's *'Access Key ID'* and *'Secret Access Key'* into *'terraform/terraform.tfvars'* file under *'access-key'* and *'aws-secret-key'* values respectively.
- Open terminal. Navigate to the 'terraform' folder.
- Type:
    ```
    terraform init
    terraform apply
    ```
- Remember to confirm by typing: `yes`
- This should create an EC2 instance running a server on port 3000. The public IP is given by the Terraform output, after executing `terraform apply`.
- Now it is possible to test using Postman by changing the variable 'baseUrl' to http://public-ip:3000 and following the steps on the 'Testing with Postman' section.
- To destroy all resources created by Terraform, type `terraform destroy`. Remember to confirm: `yes`.
