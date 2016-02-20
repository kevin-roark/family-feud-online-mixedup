
var renderer = new frampton.WebRenderer({
  mediaConfig: mediaConfig,
  timeToLoadVideo: 6000,
  videoSourceMaker: function(filename) {
    switch (filename[0]) {
      case 'F':
        return `http://family.feud.online/media/${filename}`;

      case 'D':
        return `http://answers.feud.online/media/${filename}`;

      default:
        return `media/${filename}`;
    }
  }
});

var firstSegment = newSequencedSegment(0);
renderer.scheduleSegmentRender(firstSegment, 4000);

function newSequencedSegment(segmentIndex) {
  var videos = frampton.util.shuffle(mediaConfig.videos);

  // choose the number of videos in the group
  var numberOfVideos = frampton.util.choice([1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 10]);

  // calculate the minimum duration
  var minimumDuration = 10000;
  for (var i = 0; i < numberOfVideos; i++) {
    minimumDuration = Math.min(minimumDuration, videos[i].duration);
  }

  // choose the duration of each clip in the segment
  var segmentDuration = (Math.pow(Math.random(), 2.1) * (minimumDuration - 0.35)) + 0.35;
  console.log(`segment duration: ${segmentDuration}`);

  // construct the ordered list of segments
  var segments = [];
  for (i = 0; i < numberOfVideos; i++) {
    var segment = new frampton.VideoSegment(videos[i]);
    segment.setDuration(segmentDuration);
    segments.push(segment);
  }

  // create the sequence from the ordered list
  var sequencedSegment = new frampton.SequencedSegment({
    segments: segments
  });

  // choose a number of times to loop sequence
  var timesToLoopSegment = frampton.util.choice([1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 6]);

  var loopingSegment = frampton.finiteLoopingSegment(sequencedSegment, timesToLoopSegment, {
    onStart: () => {
      // every fourth segment that starts, should schedule the next 4 segments to give vids time to load
      if (segmentIndex % 4 === 0) {
        var accumulatedOffset = 0;
        for (var i = 1; i <= 4; i++) {
          var newSegment = newSequencedSegment(segmentIndex + i);
          accumulatedOffset += loopingSegment.msDuration();
          renderer.scheduleSegmentRender(newSegment, accumulatedOffset);
        }
      }
    }
  });

  return loopingSegment;
}
