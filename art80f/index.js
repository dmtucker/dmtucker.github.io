function repeat ( callback , frequency ) {
    return setInterval(callback, frequency);
}

function stop ( repeater ) {
    clearInterval(repeater);
}
