# mock-stats-service
Mock Stats Service


## Notes:
- The swagger file provided is not a standard swagger file. I tried to use it in Postman to import a collection but the 'schema' fields were not right.
- Aggregating stats for a course is calculated as follows:
    - totalModulesStudied as the sum of all session totalModulesStudied;
    - timeStudied as the sum of all session timeStudied;
    - averageScore as a weighted average, ie, the sum of averageScore * totalModulesStudied divided by the sum of all session totalModulesStudied.
