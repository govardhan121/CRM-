CREATE TABLE employees(
employee_id numeric (34),
first_name varchar(25),
last_name  varchar(35),
email  varchar(30),
phone_number numeric(15),
hire_date dATE,
job_id VARCHAR(15),
salary NUMERIC(20),
commission_pct NUMERIC,
manager_id NUMERIC,
department_id NUMERIC
);

INSERT INTO employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)VALUES(100,'Steven','King','SKING',7382659801,'6-17-1987','AD_PRES', 24000,02,45,90);
INSERT INTO employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)VALUES(101, 'Neena','Kochhar','NKOCHHAR',5151234568,'6/18/1987','AD_VP',17000,03,100,90)
INSERT INTO employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)VALUES(102,'Lex','De Haan','LDEHAAN',5151234569,'6/19/1987','AD_VP',17000,04,100,90)
INSERT INTO employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)VALUES(103,'Axander','Hunold','AHUNOLD',5904234567,'6/20/1987','IT_PROG',9000,88,102,60)
INSERT INTO employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)VALUES(104,'Bruce','Ernst','BERNST',5904234568,'6/21/1987','IT_PROG',6000,45,103,60)
INSERT INTO employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)VALUES(105,'David','Austin','DAUSTIN',590424569,'6/22/1987','IT_PROG', 4800,55,103,60)
INSERT INTO employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)VALUES(108,'Nancy','Greenberg','NGREENBE',5151244569,'6/25/1987','FI_MGR',12000,35,101,100)
INSERT INTO employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)VALUES(109,'Daniel','Faviet','DFAVIET',5151244169,'6/26/1987','FI_ACCOUNT',9000,54,108,100)
INSERT INTO employees(employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)VALUES(109,'Daniel','Faviet','DFAVIET',5151244169,'6/26/1987','FI_ACCOUNT',9000,54,108,50)

--passing the single parametere value
SELECT        employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id
FROM            employees

where department_id =@DepartmentID

--multiple deprtID aare pasing 
SELECT        employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id
FROM            employees

where department_id In(@DepartmentID)

