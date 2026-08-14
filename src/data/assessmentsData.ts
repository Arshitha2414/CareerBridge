import { AssessmentQuestion } from '../types';

export const ASSESSMENTS_QUESTION_BANK: Record<string, AssessmentQuestion[]> = {
  sql: [
    {
      id: 'q-sql-1',
      skillId: 'sql',
      type: 'mcq',
      question: 'Which clause in SQL is used to filter group-level summary records after an aggregate function has been applied?',
      options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
      correctOptionIndex: 1,
      topicTag: 'Aggregation & Grouping',
      explanation: 'The HAVING clause filters aggregated groups (e.g. HAVING COUNT(*) > 5), whereas the WHERE clause filters individual rows before aggregation occurs.'
    },
    {
      id: 'q-sql-2',
      skillId: 'sql',
      type: 'code',
      codeSnippet: `SELECT customer_id, SUM(order_amount) AS total_spent
FROM orders
WHERE order_status = 'Completed'
GROUP BY customer_id
ORDER BY total_spent DESC
LIMIT 5;`,
      question: 'What does this SQL query return?',
      options: [
        'The top 5 completed orders sorted by amount',
        'The 5 customers who spent the most on completed orders',
        'All customers with more than 5 completed orders',
        'The first 5 customer records in the database table'
      ],
      correctOptionIndex: 1,
      topicTag: 'Aggregations & Filtering',
      explanation: 'The query filters for completed orders, groups rows by customer_id to sum their total order amounts, sorts descending by total_spent, and returns the top 5 spenders.'
    },
    {
      id: 'q-sql-3',
      skillId: 'sql',
      type: 'scenario',
      question: 'You need to retrieve all customers from the `customers` table, including those who have never placed an order in the `orders` table. Which JOIN should you execute?',
      options: [
        'INNER JOIN orders ON customers.id = orders.customer_id',
        'LEFT JOIN orders ON customers.id = orders.customer_id',
        'RIGHT JOIN orders ON customers.id = orders.customer_id',
        'CROSS JOIN orders'
      ],
      correctOptionIndex: 1,
      topicTag: 'Relational JOINs',
      explanation: 'A LEFT JOIN returns all records from the left table (customers) and the matched records from the right table (orders). Unmatched rows will contain NULLs for order fields.'
    },
    {
      id: 'q-sql-4',
      skillId: 'sql',
      type: 'mcq',
      question: 'What is the purpose of a Common Table Expression (CTE) defined with the `WITH` keyword?',
      options: [
        'To permanently create an indexed physical table on the database disk',
        'To define a temporary named result set that improves readability and modularity of complex queries',
        'To encrypt sensitive columns in transactional tables',
        'To force the query optimizer to skip indexing'
      ],
      correctOptionIndex: 1,
      topicTag: 'Advanced Queries & CTEs',
      explanation: 'A Common Table Expression (CTE) is a temporary result set defined within the execution scope of a single SELECT, INSERT, UPDATE, or DELETE statement.'
    },
    {
      id: 'q-sql-5',
      skillId: 'sql',
      type: 'code',
      codeSnippet: `SELECT 
  employee_id, 
  salary, 
  department_id,
  DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as salary_rank
FROM employees;`,
      question: 'What does the `PARTITION BY department_id` clause do in this window function?',
      options: [
        'It splits the table into multiple physical database shards',
        'It calculates the salary ranking independently within each department',
        'It removes duplicate salary rows across the company',
        'It groups the final output into a single row per department'
      ],
      correctOptionIndex: 1,
      topicTag: 'Window Functions',
      explanation: 'PARTITION BY divides the query result set into partitions to which the DENSE_RANK() window function is applied separately for each department.'
    },
    {
      id: 'q-sql-6',
      skillId: 'sql',
      type: 'mcq',
      question: 'Which of the following functions will return the first non-NULL value in a list of column expressions?',
      options: ['NULLIF()', 'COALESCE()', 'NVL2()', 'ISNULL()'],
      correctOptionIndex: 1,
      topicTag: 'Data Cleaning & Null Handling',
      explanation: 'COALESCE(val1, val2, val3) evaluates the arguments in order and returns the current value of the first expression that does not evaluate to NULL.'
    },
    {
      id: 'q-sql-7',
      skillId: 'sql',
      type: 'scenario',
      question: 'A table `sales` has 1,000,000 rows. A query with `WHERE YEAR(sale_date) = 2023` is running very slowly despite an index on `sale_date`. Why?',
      options: [
        'Wrapping indexed columns inside functions like YEAR() prevents index seek optimization (sargability)',
        'SQL cannot index date columns',
        'Indexes only work on tables with fewer than 100,000 rows',
        'The query is missing a HAVING clause'
      ],
      correctOptionIndex: 0,
      topicTag: 'Query Performance & Indexing',
      explanation: 'Applying a function to an indexed column in the WHERE clause causes non-sargable evaluation, forcing a full table scan. Rewriting as `WHERE sale_date >= \'2023-01-01\' AND sale_date < \'2024-01-01\'` allows index seeking.'
    },
    {
      id: 'q-sql-8',
      skillId: 'sql',
      type: 'mcq',
      question: 'What is the main difference between `UNION` and `UNION ALL`?',
      options: [
        'UNION requires identical column types whereas UNION ALL allows mismatching schemas',
        'UNION removes duplicate rows between datasets whereas UNION ALL retains all rows',
        'UNION ALL is significantly slower than UNION',
        'UNION only works on two tables while UNION ALL works on three or more'
      ],
      correctOptionIndex: 1,
      topicTag: 'Set Operations',
      explanation: 'UNION executes a distinct sorting pass to eliminate duplicate rows, while UNION ALL simply concatenates the result sets without deduplication, making it faster.'
    },
    {
      id: 'q-sql-9',
      skillId: 'sql',
      type: 'code',
      codeSnippet: `SELECT 
  product_category,
  COUNT(CASE WHEN product_rating >= 4.5 THEN 1 END) AS high_rated_count,
  COUNT(*) AS total_products
FROM catalog
GROUP BY product_category;`,
      question: 'What does this query calculate for each product category?',
      options: [
        'The average rating of products in each category',
        'The count of high-rated products (>=4.5) alongside total product count',
        'Only categories with more than 4.5 products',
        'A syntax error because CASE statements cannot be placed inside COUNT()'
      ],
      correctOptionIndex: 1,
      topicTag: 'Conditional Aggregations',
      explanation: 'COUNT(CASE WHEN ...) counts only the rows where the condition evaluates to true (returning 1) because NULLs generated by the implicit ELSE NULL are ignored by COUNT.'
    },
    {
      id: 'q-sql-10',
      skillId: 'sql',
      type: 'scenario',
      question: 'You want to find all employees whose salary is higher than the average salary of their respective department. Which technique is most appropriate?',
      options: [
        'A correlated subquery or a Window Function (AVG(salary) OVER(PARTITION BY department_id))',
        'A simple WHERE salary > AVG(salary) clause',
        'A CROSS JOIN with a GROUP BY',
        'An ORDER BY salary DESC LIMIT 1'
      ],
      correctOptionIndex: 0,
      topicTag: 'Subqueries & Analytical Logic',
      explanation: 'You cannot use aggregate functions directly in a simple WHERE clause. You can either use a correlated subquery or calculate the department average using a window function in a CTE.'
    }
  ],

  'power-bi': [
    {
      id: 'q-pbi-1',
      skillId: 'power-bi',
      type: 'mcq',
      question: 'What is the primary difference between a Calculated Column and a DAX Measure in Power BI?',
      options: [
        'Calculated Columns are evaluated at data refresh row-by-row and stored in memory; Measures are calculated dynamically on-the-fly based on visual filter context',
        'Measures consume hard drive storage while Calculated Columns do not',
        'Calculated Columns can only use numeric data while Measures can use text',
        'Measures cannot be used in charts or matrix visuals'
      ],
      correctOptionIndex: 0,
      topicTag: 'DAX & Data Modeling',
      explanation: 'Calculated Columns evaluate during model refresh with row context and increase file size. DAX Measures calculate dynamically in response to user slicers and filter context without bloating storage.'
    },
    {
      id: 'q-pbi-2',
      skillId: 'power-bi',
      type: 'code',
      codeSnippet: `Total Sales YTD = 
CALCULATE(
    [Total Sales],
    DATESYTD('Date'[Date])
)`,
      question: 'What does this DAX measure compute?',
      options: [
        'Total sales for the last 365 rolling days',
        'Year-to-Date cumulative sales starting from January 1st of the current context year',
        'Total sales across all years combined',
        'Sales filtered only for December 31st'
      ],
      correctOptionIndex: 1,
      topicTag: 'Time Intelligence DAX',
      explanation: 'DATESYTD returns a set of dates from the beginning of the year up to the current date in filter context, enabling Year-to-Date cumulative calculations.'
    },
    {
      id: 'q-pbi-3',
      skillId: 'power-bi',
      type: 'scenario',
      question: 'Why is a Star Schema generally preferred over a single large flat table in Power BI data models?',
      options: [
        'Star schemas use fewer DAX functions',
        'Star schemas optimize VertiPaq compression, reduce memory usage, and simplify relationship filter propagation',
        'Power BI cannot import flat tables larger than 100 rows',
        'Star schemas eliminate the need for Date tables'
      ],
      correctOptionIndex: 1,
      topicTag: 'Data Modeling Architecture',
      explanation: 'Star schemas separate numeric facts from descriptive dimension tables, allowing the columnar VertiPaq engine to achieve high compression ratios and lightning-fast query execution.'
    },
    {
      id: 'q-pbi-4',
      skillId: 'power-bi',
      type: 'mcq',
      question: 'Which tool inside Power BI Desktop is used for extracting, transforming, cleaning, and unpivoting data prior to loading into the model?',
      options: ['DAX Studio', 'Power Query Editor', 'Power Automate', 'Report Builder'],
      correctOptionIndex: 1,
      topicTag: 'ETL & Power Query',
      explanation: 'Power Query Editor (using M language behind the scenes) provides rich data cleansing, shape transformations, type conversions, and column unpivoting.'
    },
    {
      id: 'q-pbi-5',
      skillId: 'power-bi',
      type: 'code',
      codeSnippet: `High Margin Sales = 
CALCULATE(
    [Total Revenue],
    FILTER(Products, Products[MarginPct] > 0.30)
)`,
      question: 'What is the role of the `CALCULATE` function in this DAX expression?',
      options: [
        'It simply multiplies the numbers together',
        'It modifies the existing filter context by evaluating [Total Revenue] under the specified Product Margin filter',
        'It formats the revenue as currency',
        'It exports the table to Excel'
      ],
      correctOptionIndex: 1,
      topicTag: 'DAX Filter Context',
      explanation: 'CALCULATE is the single most powerful function in DAX; it allows changing, adding, or overriding the visual filter context applied to an existing measure.'
    },
    {
      id: 'q-pbi-6',
      skillId: 'power-bi',
      type: 'scenario',
      question: 'When creating a line chart showing Monthly Revenue over time, the months are displaying alphabetically (April, August, December...) instead of chronologically. How do you fix this?',
      options: [
        'Rename the months to numbers (1, 2, 3...)',
        'Select the MonthName column in the Date table and set "Sort by Column" to MonthNumber',
        'Re-import the dataset from CSV',
        'Delete and recreate the line chart visual'
      ],
      correctOptionIndex: 1,
      topicTag: 'Visual Formatting & Modeling',
      explanation: 'Setting the "Sort by Column" property of MonthName to point to MonthNumber (1-12) instructs Power BI to order month labels chronologically.'
    },
    {
      id: 'q-pbi-7',
      skillId: 'power-bi',
      type: 'mcq',
      question: 'Which visual element allows users to navigate to a deeper, filtered detail page for a specific customer or region by right-clicking a chart element?',
      options: ['Tooltip page', 'Drill-through', 'Bookmark', 'Slicer'],
      correctOptionIndex: 1,
      topicTag: 'Interactivity & Drill-through',
      explanation: 'Drill-through allows report consumers to right-click a data point on a summary chart and jump directly to a dedicated detail page filtered to that exact item.'
    },
    {
      id: 'q-pbi-8',
      skillId: 'power-bi',
      type: 'mcq',
      question: 'Why should you generally avoid setting Cross-Filter Direction to "Both" (Bi-directional) unless strictly necessary?',
      options: [
        'It increases visual load and can introduce ambiguous filter paths, circular dependencies, and performance degradation',
        'Power BI does not support bi-directional filtering',
        'It converts all DAX measures to text',
        'It prevents users from using slicers'
      ],
      correctOptionIndex: 0,
      topicTag: 'Relationship Modeling',
      explanation: 'Bi-directional filtering creates multiple paths between tables, leading to unpredictable filter context propagation and severe model slowdowns.'
    },
    {
      id: 'q-pbi-9',
      skillId: 'power-bi',
      type: 'code',
      codeSnippet: `Sales Contribution % = 
DIVIDE(
    [Total Sales],
    CALCULATE([Total Sales], ALL(Products[Category]))
)`,
      question: 'What does `ALL(Products[Category])` accomplish in this DAX formula?',
      options: [
        'It selects all categories in a slicer',
        'It removes any existing filter on Product Category, returning the overall denominator total across all categories',
        'It deletes all rows in the Products table',
        'It calculates the average sales per category'
      ],
      correctOptionIndex: 1,
      topicTag: 'DAX ALL Modifier',
      explanation: 'The ALL modifier clears filters on the specified column, enabling calculations like "Percentage of Total Category Sales".'
    },
    {
      id: 'q-pbi-10',
      skillId: 'power-bi',
      type: 'scenario',
      question: 'An executive wants a dashboard button that toggles between "Regional Sales View" and "Product Performance View" without changing pages. Which Power BI feature enables this?',
      options: ['Bookmarks + Selection Pane', 'Drill-down', 'Q&A visual', 'Power BI Goals'],
      correctOptionIndex: 0,
      topicTag: 'Bookmarks & Interactivity',
      explanation: 'Combining Bookmarks (saving visual visibility states) with Buttons and the Selection Pane allows creating seamless view-toggling user experiences.'
    }
  ],

  statistics: [
    {
      id: 'q-stat-1',
      skillId: 'statistics',
      type: 'scenario',
      question: 'A company reports that the "Average Employee Salary" is $120,000, but 90% of employees earn under $65,000. Why is the Mean misleading here, and which metric should be used instead?',
      options: [
        'The Mean is heavily distorted by extreme positive outliers (C-Suite executives); the Median should be used as the robust measure of central tendency',
        'The Standard Deviation is too low; the Mode should be used',
        'The Variance was calculated in incorrect units; the Mean is fine',
        'The sample size is too large for the Mean'
      ],
      correctOptionIndex: 0,
      topicTag: 'Descriptive Statistics',
      explanation: 'The Mean is sensitive to extreme skewness and outliers. The Median divides the distribution in half and provides a realistic picture of typical employee earnings.'
    },
    {
      id: 'q-stat-2',
      skillId: 'statistics',
      type: 'mcq',
      question: 'In a standard Normal Distribution ($\mu = 0, \sigma = 1$), approximately what percentage of observations fall within $\pm 2$ standard deviations of the mean?',
      options: ['50%', '68%', '95%', '99.7%'],
      correctOptionIndex: 2,
      topicTag: 'Normal Distribution & Empirical Rule',
      explanation: 'According to the Empirical Rule (68-95-99.7), roughly 68% fall within 1 standard deviation, ~95% within 2 standard deviations, and ~99.7% within 3 standard deviations.'
    },
    {
      id: 'q-stat-3',
      skillId: 'statistics',
      type: 'scenario',
      question: 'In an A/B test for a checkout button redesign, your statistical test yields a p-value of 0.018. If your chosen significance threshold ($\alpha$) is 0.05, what is your conclusion?',
      options: [
        'Fail to reject the Null Hypothesis; no significant difference detected',
        'Reject the Null Hypothesis ($p < \alpha$); the observed lift is statistically significant and unlikely due to random chance alone',
        'The experiment is invalid because p-values must be greater than 1.0',
        'Accept the Null Hypothesis with 1.8% confidence'
      ],
      correctOptionIndex: 1,
      topicTag: 'Hypothesis Testing & p-values',
      explanation: 'When the p-value ($0.018$) is less than $\alpha$ ($0.05$), we reject the null hypothesis, concluding that there is a statistically significant effect.'
    },
    {
      id: 'q-stat-4',
      skillId: 'statistics',
      type: 'mcq',
      question: 'What is a Type I Error in statistical hypothesis testing?',
      options: [
        'Rejecting a true Null Hypothesis (False Positive)',
        'Failing to reject a false Null Hypothesis (False Negative)',
        'Calculating the standard deviation incorrectly',
        'Using a sample that is too small'
      ],
      correctOptionIndex: 0,
      topicTag: 'Hypothesis Testing Errors',
      explanation: 'A Type I error (False Positive) occurs when we reject a null hypothesis that is actually true in reality.'
    },
    {
      id: 'q-stat-5',
      skillId: 'statistics',
      type: 'mcq',
      question: 'The Central Limit Theorem states that as sample size ($n$) increases, the sampling distribution of the sample mean approaches what distribution shape, regardless of the underlying population distribution?',
      options: ['Uniform Distribution', 'Normal (Gaussian) Distribution', 'Poisson Distribution', 'Exponential Distribution'],
      correctOptionIndex: 1,
      topicTag: 'Sampling Theory & Central Limit Theorem',
      explanation: 'The Central Limit Theorem (CLT) is foundational: given a sufficiently large sample ($n \ge 30$), sample means will be normally distributed regardless of population shape.'
    },
    {
      id: 'q-stat-6',
      skillId: 'statistics',
      type: 'code',
      codeSnippet: `Pearson Correlation (r) between Marketing Spend and Sales Revenue = 0.89
p-value = 0.0001`,
      question: 'How should an analyst interpret these metrics?',
      options: [
        'There is a strong positive linear relationship between marketing spend and revenue, though correlation alone does not prove direct causality',
        'Marketing spend caused 89% of all revenue',
        'There is no correlation because r is not equal to 1.0',
        'Higher spend causes lower sales'
      ],
      correctOptionIndex: 0,
      topicTag: 'Correlation & Causation',
      explanation: 'An $r$ of $0.89$ indicates a strong positive linear correlation. A rigorous analyst recognizes correlation indicates an association, not definitive causation on its own.'
    },
    {
      id: 'q-stat-7',
      skillId: 'statistics',
      type: 'mcq',
      question: 'What does the Coefficient of Determination ($R^2$) represent in a simple linear regression model?',
      options: [
        'The slope of the regression line',
        'The proportion of total variance in the dependent variable that is explained by the independent variable',
        'The probability of a Type II error',
        'The average distance between data points'
      ],
      correctOptionIndex: 1,
      topicTag: 'Linear Regression',
      explanation: '$R^2$ (e.g. $0.75$) indicates that 75% of the variability in the target metric is explained by the regression model predictors.'
    },
    {
      id: 'q-stat-8',
      skillId: 'statistics',
      type: 'scenario',
      question: 'You want to test whether customer satisfaction ratings (on a 1-5 discrete scale) differ across three distinct store branches (North, South, East). Which statistical test is appropriate?',
      options: ['One-Way ANOVA (Analysis of Variance)', 'Simple One-Sample t-test', 'Pearson Correlation', 'Binomial test'],
      correctOptionIndex: 0,
      topicTag: 'Statistical Test Selection',
      explanation: 'One-Way ANOVA is designed specifically to determine whether there are any statistically significant differences between the means of three or more independent groups.'
    },
    {
      id: 'q-stat-9',
      skillId: 'statistics',
      type: 'mcq',
      question: 'If a data point has a Z-score of $+3.2$, what does this indicate?',
      options: [
        'The value is exactly at the median',
        'The value is $3.2$ standard deviations above the population mean, representing an unusual outlier',
        'The value is negative',
        'The measurement has an error of $3.2\%$'
      ],
      correctOptionIndex: 1,
      topicTag: 'Z-Scores & Outliers',
      explanation: 'A Z-score measures how many standard deviations an observation is from the mean. Values $|Z| > 3$ are typically flagged as notable outliers.'
    },
    {
      id: 'q-stat-10',
      skillId: 'statistics',
      type: 'scenario',
      question: 'Why is it dangerous to stop an A/B test early as soon as the p-value drops below 0.05 on Day 2 of a planned 14-day experiment?',
      options: [
        'Peeking and early stopping causes inflated False Positive rates (alpha spending error) due to sample size volatility and day-of-week seasonality',
        'Computers need 14 days to process data',
        'p-values only work on weekends',
        'Early stopping makes the sample size too large'
      ],
      correctOptionIndex: 0,
      topicTag: 'Experimentation Pitfalls',
      explanation: 'Continuous peeking and stopping on early statistical significance dramatically inflates the Type I error rate. Experiments must run for their pre-calculated sample size and full business cycles.'
    }
  ],

  python: [
    {
      id: 'q-py-1',
      skillId: 'python',
      type: 'code',
      codeSnippet: `import pandas as pd
df = pd.DataFrame({'sales': [100, 200, None, 400]})
print(df['sales'].fillna(df['sales'].mean()).iloc[2])`,
      question: 'What value will be printed to the console?',
      options: ['0.0', '233.33', '200.0', 'NaN'],
      correctOptionIndex: 1,
      topicTag: 'Pandas & Data Cleaning',
      explanation: 'The mean of non-null values is $(100 + 200 + 400) / 3 = 700 / 3 \\approx 233.33$. `fillna()` replaces the `None` at index 2 with this mean.'
    },
    {
      id: 'q-py-2',
      skillId: 'python',
      type: 'mcq',
      question: 'What is the fundamental difference between a Python List and a Tuple?',
      options: [
        'Lists are mutable (can be modified after creation), whereas Tuples are immutable (cannot be altered)',
        'Tuples can hold multiple data types while Lists can only store numbers',
        'Lists are indexed from 1 while Tuples are indexed from 0',
        'Tuples cannot be iterated over in for loops'
      ],
      correctOptionIndex: 0,
      topicTag: 'Python Data Structures',
      explanation: 'Lists are mutable `[1, 2]`, allowing items to be appended or changed. Tuples `(1, 2)` are immutable and cannot be changed after definition.'
    },
    {
      id: 'q-py-3',
      skillId: 'python',
      type: 'code',
      codeSnippet: `numbers = [1, 2, 3, 4, 5, 6]
evens_squared = [x**2 for x in numbers if x % 2 == 0]
print(evens_squared)`,
      question: 'What is the output of this Python list comprehension?',
      options: ['[1, 4, 9, 16, 25, 36]', '[4, 16, 36]', '[2, 4, 6]', '[16]'],
      correctOptionIndex: 1,
      topicTag: 'List Comprehensions',
      explanation: 'The list comprehension filters for even numbers `[2, 4, 6]` and squares each: $2^2=4$, $4^2=16$, $6^2=36$, giving `[4, 16, 36]`.'
    },
    {
      id: 'q-py-4',
      skillId: 'python',
      type: 'scenario',
      question: 'You are manipulating a Pandas DataFrame with 5 million rows. Why is vectorized column arithmetic (`df["total"] = df["price"] * df["qty"]`) preferred over iterating with a `for` loop or `.iterrows()`?',
      options: [
        'Vectorized operations execute in compiled C backend with SIMD CPU instructions, making them hundreds of times faster',
        'for loops are not supported in Python 3',
        '.iterrows() alters the original column names',
        'Vectorized code uses more RAM than a loop'
      ],
      correctOptionIndex: 0,
      topicTag: 'Performance & Vectorization',
      explanation: 'Pandas and NumPy vectorization delegates operations directly to optimized C arrays and memory buffers, avoiding Python interpreter loop overhead.'
    },
    {
      id: 'q-py-5',
      skillId: 'python',
      type: 'code',
      codeSnippet: `def calculate_discount(price, discount=0.10):
    return price * (1 - discount)

print(calculate_discount(100, 0.25))`,
      question: 'What will be the returned result of this function call?',
      options: ['90.0', '75.0', '25.0', '100.0'],
      correctOptionIndex: 1,
      topicTag: 'Functions & Default Arguments',
      explanation: 'Passing `0.25` overrides the default `discount=0.10`. The calculation is $100 \\times (1 - 0.25) = 75.0$.'
    },
    {
      id: 'q-py-6',
      skillId: 'python',
      type: 'mcq',
      question: 'Which Pandas method is used to compute group-level aggregations (such as mean revenue per department)?',
      options: ['df.pivot()', 'df.groupby()', 'df.merge()', 'df.concat()'],
      correctOptionIndex: 1,
      topicTag: 'Pandas Groupby',
      explanation: '`df.groupby(\'department\')[\'revenue\'].mean()` groups the DataFrame by department and computes the mean revenue for each group.'
    },
    {
      id: 'q-py-7',
      skillId: 'python',
      type: 'code',
      codeSnippet: `try:
    result = 10 / 0
except ZeroDivisionError:
    result = 0
finally:
    status = "Complete"`,
      question: 'When does the code inside the `finally` block execute?',
      options: [
        'Only if no exception was raised in the try block',
        'Only when a ZeroDivisionError occurs',
        'Always, regardless of whether an exception occurred or was handled',
        'Never, because 10 / 0 terminates the interpreter'
      ],
      correctOptionIndex: 2,
      topicTag: 'Exception Handling',
      explanation: 'The `finally` block is guaranteed to execute whether an exception occurred, was caught, or was avoided completely.'
    },
    {
      id: 'q-py-8',
      skillId: 'python',
      type: 'mcq',
      question: 'What is the purpose of Python virtual environments (`venv` or `conda env`)?',
      options: [
        'To speed up CPU clock speed',
        'To isolate project-specific dependencies and library versions from conflicting globally',
        'To compile Python code into C binaries',
        'To encrypt the source code files'
      ],
      correctOptionIndex: 1,
      topicTag: 'Environment Management',
      explanation: 'Virtual environments create isolated self-contained folders with specific package versions, avoiding version collisions across different projects.'
    },
    {
      id: 'q-py-9',
      skillId: 'python',
      type: 'code',
      codeSnippet: `import numpy as np
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.shape)`,
      question: 'What is printed by `arr.shape`?',
      options: ['(6,)', '(2, 3)', '(3, 2)', '6'],
      correctOptionIndex: 1,
      topicTag: 'NumPy Arrays',
      explanation: 'The array has 2 rows and 3 columns, so its shape tuple is `(2, 3)`.'
    },
    {
      id: 'q-py-10',
      skillId: 'python',
      type: 'scenario',
      question: 'You want to merge two DataFrames on `customer_id` keeping all records from the left DataFrame even if there is no match in the right. Which method call is correct?',
      options: [
        'pd.merge(df1, df2, on="customer_id", how="left")',
        'pd.merge(df1, df2, on="customer_id", how="inner")',
        'pd.concat([df1, df2], axis=0)',
        'df1.join_records(df2)'
      ],
      correctOptionIndex: 0,
      topicTag: 'Pandas Merging & Joining',
      explanation: '`how="left"` performs a left outer merge in Pandas, identical to a SQL LEFT JOIN.'
    }
  ]
};
