export const handlers = [];
export function IncomingMessageHandler(options) {
    return (target, key, descriptor) => {
        if (typeof descriptor.value !== 'function')
            throw new Error('IncomingMessageHandler can only be applied to methods.');
        const originalMethod = descriptor.value;
        handlers.push({
            message: options.message,
            handler: originalMethod.bind(new target.constructor())
        });
    };
}
