const delay = ms => new Promise(res => setTimeout(res, ms));    //set an asynchronous timeout in ms

export async function wait(timer) {
    await delay(timer); // do the pause
}