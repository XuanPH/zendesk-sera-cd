export function handleBackgroundFunction() {
    //check điều kiện
    let _client = this;
    _client.on('ticket.save', function () {
        console.log('ticket on saved');
        return false;
    });
}