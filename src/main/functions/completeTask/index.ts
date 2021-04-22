import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, taskToComplete): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const updatedTask = {
        ...taskToComplete,
        "completedDate": new Date()
    }
    
    context.bindings.completedTask = updatedTask
    context.res = {
        body: updatedTask
    };

};

export default httpTrigger;