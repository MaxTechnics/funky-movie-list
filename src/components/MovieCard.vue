<template>
    <div class="movie_card" :style="`--color-glow: rgba(${movie_data.color}, 0.7)`">
        <div class="info_section">
            <div class="movie_header">
                <img class="locandina" :src="movie_data.poster" />
                <h1>{{ movie_data.movie_title }}</h1>
                <h1 v-if="movie_data.movie_alt_title">({{ movie_data.movie_alt_title }})</h1>
                <h4>{{ movie_data.release_date }}, {{ movie_data.language }}</h4>
                <span class="minutes">{{ movie_data.runtime }} min</span>
                <p class="type">{{ movie_data.genres.slice(0, 3).join(', ') }}</p>
            </div>
            <div class="movie_desc">
                <p class="text">{{ movie_data.movie_overview }}</p>
            </div>
            <!-- <div class="movie_social"> -->
            <!-- <ul> -->
            <!-- <li><i class="material-icons">share</i></li> -->
            <!-- <li><i class="material-icons"></i></li> -->
            <!-- <li><i class="material-icons">chat_bubble</i></li> -->
            <!-- </ul> -->
            <!-- </div> -->
        </div>
        <div class="blur_back" :style="`background-image: url(${movie_data.backdrop})`"></div>
    </div>
</template>

<script setup lang="ts">
import { get_palette } from '@/assets/color_puller'
import { onBeforeMount, ref } from 'vue';

const movie_data = ref({
    movie_title: '',
    movie_alt_title: null,
    movie_overview: '',
    release_date: '',
    runtime: 0,
    poster: '',
    backdrop: '',
    language: '',
    genres: [],
    color: '0, 0, 0'
})

const props = defineProps<{
    movie_id: string
    // movie_year: string,
    // movie_director: string,
    // movie_duration: string,
    // movie_genre: string,
    // movie_description: string,
    // movie_image: string,
    // movie_background: string
}>()

onBeforeMount(() => {
    fetch(`https://api.themoviedb.org/3/movie/${props.movie_id}?api_key=${import.meta.env.VITE_APP_TMDB_TOKEN}`).then(async r => r.json()).then(async r => {
        if (r.title === r.original_title) movie_data.value.movie_title = r.title;
        if (r.title !== r.original_title) {
            movie_data.value.movie_title = r.original_title;
            movie_data.value.movie_alt_title = r.title;
        }
        movie_data.value.movie_overview = r.overview;
        movie_data.value.release_date = new Date(r.release_date).getFullYear().toString();
        movie_data.value.runtime = r.runtime;
        movie_data.value.poster = `https://image.tmdb.org/t/p/original/${r.poster_path}`;
        movie_data.value.backdrop = `https://image.tmdb.org/t/p/original/${r.backdrop_path}`;
        movie_data.value.language = r.original_language.toUpperCase();
        movie_data.value.genres = r.genres.map((e: { id: number, name: string }) => e.name);
        await get_palette(movie_data.value.backdrop).then((rgb) => {
            movie_data.value.color = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        })
    })
})
</script>

<style lang="scss" scoped>

.movie_card{
  position: relative;
  display: block;
//   width: 800px;
width: 914px;
//   height: 350px;
height: 400px;
  margin: 100px auto; 
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  &:hover{
    transform: scale(1.02);
    transition: all 0.4s;
  }
  .info_section{
    position: relative;
    width: 100%;
    height: 100%;
	background-blend-mode: multiply;
    z-index: 2;
    border-radius: 10px;
    .movie_header{
      position: relative;
      padding: 25px;
      height: 40%;
      h1{
        color: #fff;
        font-weight: 400;
      }
      h4{
        color: #9ac7fa;
        font-weight: 400;
      }
      .minutes{
        display: inline-block;
        margin-top: 10px;
        color: #fff;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid rgba(255,255,255,0.13);
      }
      .type{
        display: inline-block;
        color: #cee4fd;
        margin-left: 10px;
      }
      .locandina{
        position: relative;
        float: left;
        margin-right: 20px;
        height: 120px;
        box-shadow: 0 0 20px -10px rgba(0,0,0,0.5);
      }
    }
    .movie_desc{
      padding: 25px;
      height: 50%;
      .text{
        color: #cfd6e1;
      }
    }
    .movie_social{
      height: 10%;
      padding-left: 15px;
      padding-bottom: 20px;
      ul{
        list-style: none;
        padding: 0;
        li{
          display: inline-block;
          color: rgba(255,255,255,0.4);
          transition: color 0.3s;
          transition-delay: 0.15s;
          margin: 0 10px;
          &:hover{
            transition: color 0.3s;
            color: rgba(255,255,255,0.8);
          }
          i{
            font-size: 19px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .blur_back{
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%; right: 0;
    background-size: cover;
    border-radius: 11px;
  }
}

.movie_card{
//   box-shadow: 0px 0px 150px -45px var(--color-glow);
  box-shadow: 0px 0px 150px -5px var(--color-glow);
  margin-bottom: 200px;
  &:hover{
    box-shadow: 0px 0px 120px -55px var(--color-glow);
  }
}

@media screen and (min-width: 768px) {
  .movie_header{
    width: 60%;
  }
  
  .movie_desc{
    width: 50%;
  }
  
  .info_section{
    background: linear-gradient(to right, #0d0d0c 50%, transparent 100%);
  }
  
  .blur_back{
    width: 80%;
    background-position: -100% 10% !important;  
  }
}

@media screen and (max-width: 768px) {
  .movie_card{
    width: 95%;
    margin: 70px auto; 
    min-height: 350px;
    height: auto;
  }
  
  .blur_back{
    width: 100%;
    background-position: 50% 50% !important;  
  }
  
  .movie_header{
    width: 100%;
    margin-top: 85px;
  }
  
  .movie_desc{
    width: 100%;
  }
  
  .info_section{
    background: linear-gradient(to top, rgb(20, 20, 19) 50%, transparent 100%);
    display: inline-grid;
  }
}


#bright{
  box-shadow: 0px 0px 150px -45px rgba(255, 51, 0, 0.5);
  &:hover{
    box-shadow: 0px 0px 120px -55px rgba(255, 51, 0, 0.5);
  }
}

.bright_back{
  background: url("https://occ-0-2433-448.1.nflxso.net/art/cd5c9/3e192edf2027c536e25bb5d3b6ac93ced77cd5c9.jpg");
}

#tomb{
  box-shadow: 0px 0px 150px -45px rgba(19, 160, 134, 0.6);
  &:hover{
    box-shadow: 0px 0px 120px -55px rgba(19, 160, 134, 0.6);
  }
}

.tomb_back{
  background: url("https://fsmedia.imgix.net/cd/c9/5e/ba/4817/4d9a/93f0/c776ec32ecbc/lara-crofts-neck-looks-unnatural-in-the-new-poster-for-tomb-raider.png");
}

#ave{
  box-shadow: 0px 0px 150px -45px rgba(199,147,75, 0.7);
  margin-bottom: 200px;
  &:hover{
    box-shadow: 0px 0px 120px -55px rgba(199,147,75, 0.7);
  }
}

.ave_back{
    background: url("https://www.gannett-cdn.com/-mm-/c03fd140debe8ad4c05cf81a5cad7ad61a12ce52/c=0-1580-2985-3266&r=x803&c=1600x800/local/-/media/2017/06/09/USATODAY/USATODAY/636326272873599176-Black-Panther-Teaser.jpg");
}
</style>
