import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.res = {
        status: 400
    };

    if (req?.body?.description) {
        const task = {
            id: new Date().toISOString() + Math.random().toString().substr(2,8),
            description: req?.body?.description,
            dueDate: req?.body?.dueDate,
        }
        context.bindings.newTask = JSON.stringify(task);
        context.res = {
            status: 201,
            body: task
        };
    }

};

export default httpTrigger;