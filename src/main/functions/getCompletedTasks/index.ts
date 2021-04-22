import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, completedTasks): Promise<void> {
    context.res = {
        body: completedTasks
    };

};

export default httpTrigger;