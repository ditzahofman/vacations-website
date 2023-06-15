import { Notyf } from "notyf";

class NotifyService {

    private notify = new Notyf({
        position: {x: "right", y: "bottom"},
        types: [
            {
                type: 'success',
                duration: 4000,
                background: 'blue',
                dismissible: true,
            },
            {
                type: 'error',
                duration: 7000,
                dismissible: true,
            }
        ]
    });

    public success(message: string): void {
        this.notify.success(message);
    }

    public error(err: string): void {
        const message = this.extractErrorMessage(err);
        this.notify.error(message);
    }

    private extractErrorMessage(err: any): string {
        if (typeof err === "string") return err;

        if (typeof err.response?.data === "string") return err.response.data;

        if (Array.isArray(err.response.data)) return err.response.data[0];

        if (typeof err.message === "string") return err.message;

        console.log(err);
        return "Some error occurred, please try again"
    }
}

const notifyService = new NotifyService();

export default notifyService;