// preview url => "https://st.sibnet.ru/upload/cover/video_4115609_0.jpg"
// iframe => <iframe src="https://video.sibnet.ru/shell.php?videoid=" frameborder="0" scrolling="no" allowfullscreen></iframe>

// cache images
var _cacheimgerror = new Image();       _cacheimgerror.src = 'error.jpg';
var _cacheimgloading = new Image();     _cacheimgloading.src = 'loading.gif';
// getting some values
var video_count = 6000000;
var seed_count = Math.floor(video_count / 16);
var seed = Math.floor(seed_count * Math.random());
var index = seed*16;
// get tabs & elements
var tab_video = document.getElementById('video');
var tab_prev = document.getElementById('previews');
var input_seed = document.getElementById('seed-input');
input_seed.value = seed;
var input_id = document.getElementById('id-input');
input_id.value = index;
var range_id = document.getElementById('id-range');
range_id.innerHTML = `${seed*16} - ${seed*16+15}`;
var copy_id = document.getElementById('copy-id');
// get IFRAME, set video ID
var iframe = tab_video.getElementsByTagName('iframe')[0];
iframe.src = `https://video.sibnet.ru/shell.php?videoid=${index}`;
// resize iframe
window.onresize = () => {
    iframe.width = document.body.clientWidth;
    iframe.height = Math.floor(document.body.clientHeight*0.95);
}; window.onresize();
// fast searcher
var previews = [];
var searcher = document.getElementsByClassName('searcher')[0];
for(var i=0; i<16; i++) {
    previews[i] = new Image();
    previews[i].src = `https://st.sibnet.ru/upload/cover/video_${seed*16+i}_0.jpg`;
    eval(`previews[${i}].onerror = () => {previews[${i}].src = 'error.jpg'};`);
    eval(`previews[${i}].onclick = () => {selectVideo(${seed*16+i})};`);
    searcher.appendChild(previews[i]);
};
// tab select
function randomVideo() {
    tab_prev.classList.remove('active');
    tab_video.classList.add('active');
};
function randomPreviews() {
    tab_video.classList.remove('active');
    tab_prev.classList.add('active');
};
// video functions
function selectVideo(id) {
    index = id;
    input_id.value = id;
    randomVideo();
    setVideoID(id);
    window.onresize();
};
function setVideoID(id) {
    iframe.src = `https://video.sibnet.ru/shell.php?videoid=${id}`;
    index = id;
};
function randomizeVideo() {
    selectVideo(Math.floor(Math.random() * video_count))
};
function applyID() {
    index = Number(input_id.value);
    selectVideo(index)
};
function copyURL() {
    navigator.clipboard.writeText(`https://video.sibnet.ru/shell.php?videoid=${index}`);
    copy_id.innerHTML = 'Copied!'; copy_id.onclick = null;
    setTimeout(() => {copy_id.innerHTML = 'Copy URL'; copy_id.onclick = copyURL}, 2000);
};
function newTabVideo() {
    index = Number(input_id.value);
    window.open(`https://video.sibnet.ru/shell.php?videoid=${index}`)
};
// preview functions
function randomSeed() {
    applySeed(Math.floor(seed_count * Math.random()));
};
function applySeed(seed_) {
    if(seed_ == seed) {return};
    seed = seed_;
    for(var i=0; i<16; i++) {
        previews[i].src = 'loading.gif';
        previews[i].src = `https://st.sibnet.ru/upload/cover/video_${seed*16+i}_0.jpg`;
        eval(`previews[${i}].onclick = () => {selectVideo(${seed*16+i})};`);
    };
    input_seed.value = seed;
    range_id.innerHTML = `${seed*16} - ${seed*16+15}`;
};
function applySelectedSeed() {
    applySeed(Number(input_seed.value));

};
function applyNextSeed() {
    applySeed(Number(input_seed.value) + 1)
};