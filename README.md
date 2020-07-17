# CoachingBetter

Online coaching app with predictive teaching, featuring 3 different algorithms.


## Normal Probability

Probability is the likelihood or chance of an event occurring.

| Probability = |  the number of ways of achieving success |
| --- | --- |
|   |  the total number of possible outcomes |

In this case it just analyses the existent data set without favoring any stimulation of newer approaches towards the same goal.

## Competitive advantage

If the user has a name and experience in the industry, we assume that more programs will be put in place or by other means has continuity to the activity. Also, as a professional the chosen methods even if not traditional or standard should work efficiently.

If there is only 1 layer, that would favour the number of students per course. Which would get a bigger weight in what&#39;s right and wrong towards a certain goal. This requires for a second layer to allow new methods even if less popular (in quantity) to flourish. This can be justified by inflating the results at the moment of prediction if the chosen method is not the most popular. It promotes innovation while maintaining efficiency in the methods used allowing for professionals with great rating to influence the outcome.

Here are 2 proposed methods:

### Median Rating advantage

This proposed method allows for a stimulus in the weight of the smaller value by breaking down the difference of both the ratings values into actual tangible chunks by the ratio of the entire data set in addition to the current rating of it. This boosts the smaller value in a fair manner where the difference between the top values are not that big.

### Teacher&#39;s Weight advantage

There was much thought on how much weight should a coach/teacher have on a subject, so let&#39;s assume it&#39;s at least twice the amount of the student. But that just states the expertise on a specific field is twice as the student&#39;s, which leaves out personal experience and is just an assumption. Let&#39;s make it about the course weight through feedback given by the clients.

The weight here is redistributed in a way that at maximum efficiency (100%), determined by the personal rating in all the programs, it doubles the weight of the value at the moment of prediction. It takes into account the average personal rating of the teacher by category and adds it to the actual average rating of the entire scope. Which means that it allows for a better understanding of what works better in terms of feedback given.

# Prediction Algorithm: Results

## Normal Probability

![](https://i.imgur.com/UidKJYz.png)




We can determine the probability for each scenario:

    ·         Assuming the user inserted exercise A

<table>
  <tr>
   <td>P(A|B) =
   </td>
   <td> <span style="text-decoration:underline;">x1 * y1</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td>x2 * y2
   </td>
  </tr>
</table>


 

P(A|B) = Probability of A given B is true

x1 = Quantity of A

x2 =Quantity of B

y1 = Average Program Rating of A

y2 = Average Program Rating of B


<table>
  <tr>
   <td>P(A|B) =
   </td>
   <td> <span style="text-decoration:underline;">2 * 80</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td>4 * 30
   </td>
  </tr>
</table>


 

**Result**


<table>
  <tr>
   <td>P(A|B) =
   </td>
   <td><span style="text-decoration:underline;"> 160</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td> 120
   </td>
  </tr>
</table>


 


<table>
  <tr>
   <td>P(A|B) =
   </td>
   <td>133.33 %
   </td>
  </tr>
</table>


 


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td> <span style="text-decoration:underline;">x1 * y1</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td>x2 * y2
   </td>
  </tr>
</table>


 

P(A|C) = Probability of A given B is true

x1 = Quantity of A

x2 =Quantity of C

y1 = Average Program Rating of A

y2 = Average Program Rating of C


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td> <span style="text-decoration:underline;">2 * 80</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td>5 * 40
   </td>
  </tr>
</table>


 

**Result**


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td><span style="text-decoration:underline;"> 160</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td> 200
   </td>
  </tr>
</table>


 


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td>80 %
   </td>
  </tr>
</table>


 

**Predicted result:**

    ·         C > A > B


## Median Rating advantage

Given the example: **[Test Example]**

We can determine the probability for each scenario:


    ·         Assuming the user inserted exercise A

 


<table>
  <tr>
   <td colspan="2" > 

<table>
  <tr>
   <td>yB =
   </td>
   <td>x2 +
   </td>
   <td> ( <span style="text-decoration:underline;">x2</span> -<span style="text-decoration:underline;"> y2</span> <span style="text-decoration:underline;">)</span>
<p>
   x1   y1
   </td>
  </tr>
</table>


yB = x2 + ( x2/x1 – y2/y1)

 


<table>
  <tr>
   <td>P(A|B or C) =
   </td>
   <td> <span style="text-decoration:underline;">x1 * yB</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td>x2 * y2
   </td>
  </tr>
</table>


 

P(A|B) = Probability of A given B is true

x1 = Quantity of A

x2 =Quantity of B

y1 = Average Program Rating of A

y2 = Average Program Rating of B

yB = Bonus advantage

   </td>
  </tr>
  <tr>
   <td>**Result**


<table>
  <tr>
   <td>P(A|B) =
   </td>
   <td>133.33 %
   </td>
  </tr>
</table>


 

Stays the same as it the probability is already bigger than B

   </td>
   <td>**Result**

yB = 112


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td><span style="text-decoration:underline;"> 224</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td> 200
   </td>
  </tr>
</table>


 


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td>112 %
   </td>
  </tr>
</table>


   </td>
  </tr>
</table>


**Predicted result:**


    ·         A > C > B

** **

 

 

## Teacher’s Weight advantage

Given the example: **[Test Example]**

We can determine the probability for each scenario:


    ·         Assuming the user inserted exercise A.

 


<table>
  <tr>
   <td colspan="2" > 
<p>
xB = x2 + par
<p>
 

<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td> <span style="text-decoration:underline;">x1 * y1</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td>xB * y2
   </td>
  </tr>
</table>


 

P(A|B) = Probability of A given B is true

x1 = Quantity of A

x2 =Quantity of B

y1 = Average Program Rating of A

y2 = Average Program Rating of B

par = personal average rating in the same category

xB = Bonus advantage

   </td>
  </tr>
  <tr>
   <td>**Scenario 1: par = 5%**

**Result**


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td><span style="text-decoration:underline;"> 180</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td> 200
   </td>
  </tr>
</table>


 


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td>90 %
   </td>
  </tr>
</table>


   </td>
   <td>**Scenario 2: par = 50%**

**Result**


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td><span style="text-decoration:underline;"> 260</span>
   </td>
  </tr>
  <tr>
   <td> 
   </td>
   <td> 200
   </td>
  </tr>
</table>


 


<table>
  <tr>
   <td>P(A|C) =
   </td>
   <td>130 %
   </td>
  </tr>
</table>


   </td>
  </tr>
</table>


**Predicted result:**


    ·         **A > C > B**

 

 

 
