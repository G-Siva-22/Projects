export interface SequentialMethodResponse {
  task: string;
  method: string;
  generated: string;
  steps: Array<{
    number: number;
    requiredState: string;
    instruction: string;
    instructionType: string;
    resultingState: string;
    dependencies: string;
  }>;
  totalSteps: number;
  estimatedTime: string;
  criticalPath: string;
  parallelOpportunities: string;
}

export interface ParallelMethodResponse {
  task: string;
  method: string;
  generated: string;
  steps: Array<{
    number: number;
    requiredState: string;
    instruction: string;
    instructionType: string;
    resultingState: string;
    dependencies: string;
  }>;
  totalSteps: number;
  estimatedTime: string;
  criticalPath: string;
  parallelOpportunities: string;
}

export interface ComparisonResponse {
  sequential: string;
  parallel: string;
}

export class IterativeService {
  private apiKey = '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';

  async callSequentialMethod(task: string): Promise<SequentialMethodResponse> {
    const prompt = `You are a task planning specialist. I need you to break down the following task into a structured, step-by-step plan using the Sequential Completion Method.

**Sequential Completion Method**: Complete each object's full process before starting the next object. For each object (e.g., shirt1, towel2), perform the entire sequence of required actions from start to finish before moving to the next object. This method mimics real-world scenarios where objects are processed one-by-one to completion.

Object Processing Order: object1 → object2 → object3 → object4 → object5

Task: "${task}"

**CRITICAL REQUIREMENT: Generate EXACTLY 6-7 steps only. Do not exceed 7 steps under any circumstances.**

Please provide a detailed execution plan following this exact format:

TASK BREAKDOWN AND EXECUTION PLAN
=====================================

**Task**: ${task}
**Method**: Sequential Completion Method
**Generated**: ${new Date().toLocaleString()}

EXECUTION STEPS:
---------------

Step 1:
- Required State: [What conditions must be met before this step]
- Instruction: [Clear, actionable instruction]
- Instruction Type: [Simple Instruction/Instruction with Purpose/Conditional Instruction]
- Resulting State: [What will be achieved after this step]
- Dependencies: None

    const response = await this.makeApiCall(prompt);
    return this.parseJsonResponse<SequentialMethodResponse>(response);
- Required State: [What conditions must be met before this step]
- Instruction: [Clear, actionable instruction]
- Instruction Type: [Simple Instruction/Instruction with Purpose/Conditional Instruction]
- Resulting State: [What will be achieved after this step]
- Dependencies: Step 1

[Continue for exactly 6-7 steps total...]

EXECUTION SUMMARY:
-----------------
- Total Steps: [Must be 6 or 7]
- Estimated Time: [Your estimate]
- Critical Path: [Steps that cannot be parallelized]
- Parallel Opportunities: [Steps that can run simultaneously if applicable]

**Example from the document:**
For washing and hanging 5 shirts and 5 towels using Sequential Method:
1. Gather all shirts and towels
2. Wash shirt 1 completely
3. Hang shirt 1 to dry
4. Wash shirt 2 completely
5. Hang shirt 2 to dry
[Continue until all items are processed sequentially]

Generate the complete plan with exactly 6-7 steps now. 
You should strictly follow this output format
🧠 Task: Wash and Hang 5 Shirts and 5 Towels
Sequencing Method: Sequential Completion Method
Each item (shirt1 to towel5) is fully processed before moving to the next.

✅ Sample Instructions for shirt1
1.	gather shirt1
  Required state: shirt1 is uncollected   Resulting state: shirt1 is gathered
  Type: Simple Instruction
  Dependencies: None
2.	gather detergent
  Required state: detergent is available   Resulting state: detergent is gathered   Type: Simple Instruction
  Dependencies: None
3.	place shirt1 and detergent in washing
  Required state: shirt1 and detergent   Resulting state: shirt1 and detergent   Type: Mandatory Instruction
  Dependencies: Steps 1, 2
4.	activate washing machine to wash shirt1   Required state: shirt1 and detergent   Resulting state: shirt1 is washed
 
  Type: Instruction with Purpose
  Dependencies: Step 3
5.	gather washed shirt1
  Required state: shirt1 is washed
   Resulting state: washed shirt1 is gathered
  Type: Simple Instruction
  Dependencies: Step 4
6.	hang shirt1
  Required state: washed shirt1 is gathered   Resulting state: shirt1 is hanging
  Type: Simple Instruction
  Dependencies: Step 5

🔁 Repeat steps 1–6 for:
shirt2 → shirt3 → shirt4 → shirt5 → towel1 → towel2 → towel3 → towel4 → towel5
(replacing "shirt1" in Step 4 with each object accordingly)

✅ Final Sequenced Plan (with Purpose Made Explicit)
🧥 Shirts


 
1.	gather shirt1
2.	gather detergent
3.	place shirt1 and detergent in washing machine
4.	activate washing machine to wash shirt1
5.	gather washed shirt1
6.	hang shirt1
7.	gather shirt2
8.	gather detergent
9.	place shirt2 and detergent in washing machine
10.	activate washing machine to wash shirt2
11.	gather washed shirt2
12.	hang shirt2
 
(Continue similarly through shirt5)


🧻 Towels
31.	gather towel1
32.	gather detergent
 
33.	place towel1 and detergent in washing machine
34.	activate washing machine to wash towel1
35.	gather washed towel1
36.	hang towel1
...
(Continue to towel5)


🔗 Dependency Table (Excerpt)

Step	Depends On	Objects	Classification	Consistency
1	—	shirt1	Simple Instruction	—
2	—	detergent	Simple Instruction	—
3	1, 2	shirt1, detergent	Mandatory Instruction	Yes
4	3	shirt1	Instruction with Purpose	Yes
5	4	shirt1	Simple Instruction	Yes
6	5	shirt1	Simple Instruction	Yes
`;

    return this.makeApiCall(prompt);
  }

  async callParallelMethod(task: string): Promise<ParallelMethodResponse> {
    const prompt = `You are a task planning specialist. I need you to break down the following task into a structured, step-by-step plan using the Step-by-Step Parallel Method.

**Step-by-Step Parallel Method**: Group all similar actions together (e.g., gather all items first, then process all items in parallel steps). For each action, perform it on all objects before moving to the next action.

Action Processing Order: Action1 on all objects → Action2 on all objects → Action3 on all objects

Task: "${task}"

**CRITICAL REQUIREMENT: Generate EXACTLY 6-7 steps only. Do not exceed 7 steps under any circumstances.**

Please provide a detailed execution plan following this exact format:

TASK BREAKDOWN AND EXECUTION PLAN
=====================================

**Task**: ${task}
**Method**: Step-by-Step Parallel Method
**Generated**: ${new Date().toLocaleString()}

EXECUTION STEPS:
---------------

Step 1:
- Required State: [What conditions must be met before this step]
- Instruction: [Clear, actionable instruction]
- Instruction Type: [Simple Instruction/Instruction with Purpose/Conditional Instruction]
- Resulting State: [What will be achieved after this step]
- Dependencies: None

    const response = await this.makeApiCall(prompt);
    return this.parseJsonResponse<ParallelMethodResponse>(response);
- Required State: [What conditions must be met before this step]
- Instruction: [Clear, actionable instruction]
- Instruction Type: [Simple Instruction/Instruction with Purpose/Conditional Instruction]
- Resulting State: [What will be achieved after this step]
- Dependencies: Step 1

[Continue for exactly 6-7 steps total...]

EXECUTION SUMMARY:
-----------------
- Total Steps: [Must be 6 or 7]
- Estimated Time: [Your estimate]
- Critical Path: [Steps that cannot be parallelized]
- Parallel Opportunities: [Steps that can run simultaneously]

**Example from the document:**
For washing and hanging 5 shirts and 5 towels using Parallel Method:
1. Gather all shirts and towels together
2. Wash all shirts and towels in batches
3. Hang all washed items to dry simultaneously
4. Check drying progress of all items
[Group similar actions for parallel execution]
 
Generate the complete plan with exactly 6-7 steps now. You shoudl strictly follow this output format
 STEP-BY-STEP PARALLEL
Definition: Perform each action across all objects Purpose-Driven Instructions now clearly state the


🔁 Stages of Execution (Grouped by Ac

Stage A: Gather All Clothes
1.	gather shirt1 → Simple Instruction
2.	gather shirt2
3.	gather shirt3
4.	gather shirt4
5.	gather shirt5
6.	gather towel1
7.	gather towel2
8.	gather towel3
9.	gather towel4
10.	gather towel5

 
Stage B: Gather Detergent
11.	gather detergent
  Shared across all wash operations   Type: Simple Instruction
 

Stage C: Place Items and Wash Them Individually
Each item is placed with detergent into the washing machine, activated for its own wash cycle, then gathered and hung.


🧥 Shirts

Item	Steps
shirt1	12. place shirt1 and detergent in washing machine

| 13. **activate washing machine to wash shirt1**
| 14. gather washed shirt1
| 15. hang shirt1
| shirt2 | 16–19
| shirt3 | 20–23
| shirt4 | 24–27
| shirt5 | 28–31


🧻 Towels

Item	Steps
towel1	32. place towel1 and detergent in washing machine

| 33. **activate washing machine to wash
| 34. gather washed towel1
| 35. hang towel1
| towel2 | 36–39
| towel3 | 40–43
| towel4 | 44–47
| towel5 | 48–51

✅ Final Sequenced Plan (with Explicit
[Gathering Phase] 1–10: gather all clothes 11: gather detergent
[Washing and Hanging Phase]
12.	place shirt1 and detergent in washing machine
13.	activate washing machine to wash shirt1
14.	gather washed shirt1
15.	hang shirt1
16–19: shirt2
20–23: shirt3
24–27: shirt4
28–31: shirt5
32–35: towel1
36–39: towel2
 
40–43: towel3
44–47: towel4
48–51: towel5


🔗 Dependency Table (Excerpt)

Step	Depends On	Objects	Classification	Consistency
1	—	shirt1	Simple Instruction	—
…	—	…	…	—
11	—	detergent	Simple Instruction	—
12	1, 11	shirt1, detergent	Mandatory Instruction	Yes
13	12	shirt1	Instruction with Purpose	Yes
14	13	shirt1	Simple Instruction	Yes
15	14	shirt1	Simple Instruction	Yes
`;

    return this.makeApiCall(prompt);
  }
  async callFeatureComparison(task: string): Promise<ComparisonResponse> {
    const [sequential, parallel] = await Promise.all([
      this.callSequentialMethod(task),
      this.callParallelMethod(task)
    ]);

    return {
      sequential: JSON.stringify(sequential, null, 2),
      parallel: JSON.stringify(parallel, null, 2)
    };
  }

  private parseJsonResponse<T>(response: string): T {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // If no JSON found, try parsing the entire response
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
      throw new Error('Invalid JSON response from API');
    }
  }


  private async makeApiCall(prompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that creates detailed task execution plans. Always follow the exact formatting requirements provided by the user.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from API');
      }

      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error making API call:', error);
      throw new Error(
        error instanceof Error 
          ? `Failed to generate plan: ${error.message}`
          : 'Failed to generate plan'
      );
    }
  }
}