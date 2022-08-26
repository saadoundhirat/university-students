# University Students CRM:
- University X is looking for an internal system that stores students and Instructors data,with courses enrolled by students and Instructors.

### Student Table:
* ID:primary key
* First Name:string
* Last Name:strin g
* DOB: date
* MAJOR : string

### Instructor table:
* ID:primary key
* First Name:string
* Last Name:string
* DOB: date

### Courses Table:
* ID:primary key
* Course name
* Instructor id

### Transactional table
* ID primary key
* Course_ID
* Student_id

### We need apis (implemented using node.js) for the following requirements
1. GET all Instructors
2. GET student BY ID
3. GET all and specific student by id
4. Add new student