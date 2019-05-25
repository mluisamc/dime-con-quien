<template>
  <md-card class="md-card-login">
    <div class="section">
      <div class="container">
        <div class="wrapper">
          <div id="images">
            <div class="md-layout">
              <div
                v-for="image in images"
                v-bind:key="image.src"
                class="md-layout-item md-size-10 md-xsmall-size-100"
                :class="{ 'text-center': responsive }"
              >
                <img
                  :src="image.src"
                  class="rounded"
                  :class="{ 'responsive-image': responsive, 'img-raised': image.raised , 'rounded-circle': image.selected}"
                  :alt="image.alt"
                  @mouseover="image.raised = !image.raised"
                  @mouseout="image.raised = !image.raised"
                  @click="image.selected = !image.selected; checkFilm()"
                >
                <md-tooltip md-direction="bottom">{{image.alt}}</md-tooltip>
              </div>
            </div>
          </div>
          <div id="film">
            <div class="md-layout">
              <div class="md-layout-item md-size-40 md-xsmall-size-100"></div>
              <div class="md-layout-item md-size-20 md-xsmall-size-100">
                <a :href="film.link" target="_blank">
                  <img
                    :src="film.src"
                    :alt="film.alt"
                    class="rounded"
                    :class="{ 'hidden': !match }"
                  >
                </a>
                <md-tooltip md-direction="right">{{film.alt}}</md-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </md-card>
</template>

<script>
import ApiService from "@/services/api.js";
import {
  THEMOVIEDB_API_BASE_URL_IMAGES_PROFILES,
  THEMOVIEDB_API_BASE_URL_IMAGES_POSTERS,
  THEMOVIEDB_BASE_URL_MOVIE
} from "@/config.js";
export default {
  name: "main-card",
  data() {
    return {
      images: [],
      responsive: false,
      raised: false,
      film: {
        src: require("@/assets/img/empty.png"),
        link: "",
        alt: "Seleccione un actor"
      },
      match: true
    };
  },
  created() {
    ApiService.getPersonPopular().then(res => {
      for (let index = 0; index < res.data.results.length; index++) {
        const element = res.data.results[index];
        this.images.push({
          src: THEMOVIEDB_API_BASE_URL_IMAGES_PROFILES + element.profile_path,
          alt: element.name,
          id: element.id,
          raised: false,
          selected: false
        });
      }
    });
  },
  methods: {
    checkFilm: function() {
      let actors = this.images
        .filter(actor => actor.selected)
        .map(function(actor) {
          return actor.id;
        });
      this.film = {
        src: require("@/assets/img/empty.png"),
        link: "",
        alt: "Seleccione un actor"
      };
      if (actors.length > 0) {
        ApiService.getMoviesFromPeople(actors).then(res => {
          if (res.data.results.length > 0) {
            this.film = {
              src:
                THEMOVIEDB_API_BASE_URL_IMAGES_POSTERS +
                res.data.results[0].poster_path,
              alt: res.data.results[0].original_title,
              link: THEMOVIEDB_BASE_URL_MOVIE + res.data.results[0].id
            };
          }
        });
      }
    }
  }
};
</script>

<style lang="css">
img {
  cursor: pointer;
}

.section {
  padding: 2rem !important;
}

.md-layout-item {
  padding: 0.5rem !important;
}

.md-card-login {
  margin-top: 5rem !important;
  background-color: rgba(255, 255, 255, 0.5) !important;
}

.hidden {
  display: none;
}
</style>
