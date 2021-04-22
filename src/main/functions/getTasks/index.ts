import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, openTasks: []): Promise<void> {
    context.res = {
        body: openTasks
    };
};

export default httpTrigger;