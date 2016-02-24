
var renderer = new frampton.WebRenderer({
  mediaConfig: mediaConfig,
  timeToLoadVideo: 7000,
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

var firstSegment = newContinuousSegment();
renderer.scheduleSegmentRender(firstSegment, 4000);

function newContinuousSegment() {
  // I do this whole sequence of looped segments thing to allow scheduling
  // of more videos at a time, to give them time to load, since this score eats through so many videos
  var loopingSequencedSegments = [];
  for (var i = 0 ; i < 5; i++) {
    loopingSequencedSegments.push(newLoopingSegment());
  }

  var continousSegment = new frampton.SequencedSegment({
    segments: loopingSequencedSegments,
    onStart: () => {
      var newSegment = newContinuousSegment();
      var offset = continousSegment.msDuration();
      renderer.scheduleSegmentRender(newSegment, offset);
    }
  });

  return continousSegment;
}

function newLoopingSegment() {
  var videos = frampton.util.shuffle(mediaConfig.videos);

  // choose the number of videos in the group
  var numberOfVideos = frampton.util.choice([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8]);

  // calculate the minimum duration
  var minimumDuration = 10000;
  for (var i = 0; i < numberOfVideos; i++) {
    minimumDuration = Math.min(minimumDuration, videos[i].duration);
  }

  // choose the duration of each clip in the segment
  var segmentDuration = (Math.pow(Math.random(), 2.8) * (minimumDuration - 0.3)) + 0.3;

  // construct the ordered list of segments
  var segments = [];
  for (i = 0; i < numberOfVideos; i++) {
    var segment = new frampton.VideoSegment(videos[i]);
    segment.setDuration(segmentDuration);
    segments.push(segment);
  }

  // create the sequence from the ordered list
  var sequencedSegment = new frampton.SequencedSegment({ segments: segments });

  // choose a number of times to loop sequence
  var timesToLoopSegment = frampton.util.choice([1, 1, 1, 2, 2, 2, 3, 3, 4, 5]);

  return frampton.finiteLoopingSegment(sequencedSegment, timesToLoopSegment);
}
