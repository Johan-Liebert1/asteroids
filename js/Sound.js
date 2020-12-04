class Sound {
	constructor(src, maxStreams = 1, vol = 1.0) {
		this.streamNum = 0;
		this.streams = [];
		for (var i = 0; i < maxStreams; i++) {
			this.streams.push(new Audio(src));
			this.streams[i].volume = vol;
		}

		this.playIt = function () {
			if (SOUND_ON) {
				this.streamNum = (this.streamNum + 1) % maxStreams;
				this.streams[this.streamNum].play();
			}
		};

		this.stopIt = function () {
			this.streams[this.streamNum].pause();
			this.streams[this.streamNum].currentTime = 0;
		};
	}
}
