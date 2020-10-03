# mock-stats-service
Mock Stats Service


## Instructions:
- Postman:
    - Import postman-tests/Stats Service.postman_collection.js
    - Add variables. The easiest way is to add global variables, but make sure other scope variables don't override them. Variables needed:
        - session01: uuid for a session. For example: s3550n-0ab1-session01
        - session02: uuid for another session. For example: s3550n-0ab2-session02
        - course1: uuid for a course. For example: c0ur53-0cc1-course01
        - user1: uuid for a user. For example: us3r00-alba-user01
        - baseUrl: host or base url of the service. For example: http://localhost:3000
    Click on Runner. Select the collection imported (Stats Service) and Run it by clicking on Run Stats Service. Make sure the service is running. For example locally we can go to the src folder, open a terminal and type:
        ```
        npm install
        node index.js
        ```


## Notes:
- The swagger file provided is not a standard swagger file. I tried to use it in Postman to import a collection but the 'schema' fields were not right.
- Aggregating stats for a course is calculated as follows:
    - totalModulesStudied as the sum of all session totalModulesStudied;
    - timeStudied as the sum of all session timeStudied;
    - averageScore as a weighted average, ie, the sum of averageScore * totalModulesStudied divided by the sum of all session totalModulesStudied.
- Code is written as simple as possible with the objective of being readable and understandable. 

I tried to move away from patterns like DI most likely to use in any production environment.
