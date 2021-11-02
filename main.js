// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd =$('.cd')
const heading = $('.header ,h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
    {
        name: "Mắt Nai Cha Cha Tune",
        singer: "Duy Lion ft Ssahita",
        path: "./assets/mp3/2.mp3",
        image: "./assets/img/1.gif"
    },
        {
      name: "Mashup",
      singer: "Thầy Lộc Fuho,Khá Bảnh, Hoài Lâm, Tiến Bịp,...",
      path: "./assets/mp3/1.mp3",
      image: "./assets/img/1.jpg"
    },
    {
      name: "Cưới thôi",
      singer: "Masew, Masiu",
      path: "./assets/mp3/3.mp3",
      image: "./assets/img/3.jpg"
    },
    {
        name: "Dịu dàng em đến",
        singer: "Erik, NinjaZ",
        path: "./assets/mp3/4.mp3",
        image: "./assets/img/4.jpg"
    },
    {
        name: "Câu hứa chưa vẹn toàn",
        singer: "Phát Huy T4",
        path: "./assets/mp3/5.mp3",
        image: "./assets/img/5.jpg"
    },
    {
        name: "Ái Nộ",
        singer: "Masew, Khôi Vũ",
        path: "./assets/mp3/6.mp3",
        image: "./assets/img/6.jpg"
    },
    {
        name: "Ngày Tết Quê Em",
        singer: "Thuỳ Chi",
        path: "./assets/mp3/7.mp3",
        image: "./assets/img/7.jpg"
    }
    ],
    render: function(){
      const htmls = this.songs.map((song, index) => {
          return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>`
      }).join('')
      $('.playlist').innerHTML = htmls
    },
    handleEvents: function(){
        const _this = this
        const cdWidth = cd.offsetWidth
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],{
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const NewCdWidth = cdWidth - scrollTop
            cd.style.width = NewCdWidth > 0 ? + NewCdWidth + 'px': 0
            cd.style.opacity = NewCdWidth / cdWidth 
        }
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }
        }
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }
        nextBtn.onclick = function(){
            _this.nextSong()
            audio.play()
            _this.render()
        }
        prevBtn.onclick = function(){
            _this.prevSong()
            audio.play()
        }
        audio.onended = function(){
            nextBtn.onclick()
        }
        $('.playlist').onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)') 
            if(songNode|| e.target.closest('.option')){
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
            }
        }
    },
    difineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    start: function(){
      this.handleEvents()
      this.difineProperties()
      this.loadCurrentSong()
      this.render()
    }
}
app.start()
alert('Hello 3 bạn....')