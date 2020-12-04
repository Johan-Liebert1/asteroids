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

class Music {
	constructor(srcLow, srcHigh = null) {
		this.soundLow = new Audio(srcLow);

		if (srcHigh) this.soundHigh = new Audio(srcHigh);

		this.low = true;
		this.tempo = 1.0; // seconds per beat or something

		this.beatTime = 0; // frames left until next beat

		this.tick = () => {
			if (this.beatTime === 0) {
				this.playIt();
				this.beatTime = Math.ceil(this.tempo * FPS);
			} else {
				this.beatTime--;
			}
		};

		this.playIt = () => {
			if (this.low) {
				this.soundLow.play();
			} else {
				if (this.soundHigh) this.soundHigh.play();
			}
			this.low = !this.low;
		};

		this.setAsteroidRatio = ratio => {
			this.tempo = 1.0 - 0.75 * (1.0 - ratio);
		};
	}
}
