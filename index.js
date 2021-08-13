var client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});

var options = {
    appId: "fbe2f85e7c2e4a829c0d186a7760ae0b",
    uid: null,
    channel: null
}

var localTracks = {
    videoTrack: null,
    audioTrack: null
}

async function join() {
    options.uid = await client.join(options.appId, options.channel, null, null);
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
    localTracks.videoTrack.play("local-player");
    await client.publish(Object.values(localTracks));
}


// Link join function to join button and add channel
$("#join-form").submit(async function (e) { // The default would be to reload the page; we are preventing that
    e.preventDefault();
    if ($("#emailText").val().match(/\S+@\S+/)) {
        document.getElementById("emailText").setAttribute("class", "border-primary")
        if ($("#passwordText").val().length == 0) {
            document.getElementById("passwordText").setAttribute("class", "border-danger")
        } else {
            document.getElementById("passwordText").setAttribute("class", "border-primary")
            options.channel = $("#channel").val();
            // option.uid = await client.join(option.appid, option.channel, null, null)
            // console.log(option.uid)
            try {
                // console.log(option)
                // join(rtc, option);
                join();
            } catch (e) {
                console.error(e)
            }
        }
    } else {
        document.getElementById("emailText").setAttribute("class", "border-danger")
    }
});