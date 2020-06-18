const content = document.querySelector("header");
document.addEventListener("scroll", (e) => {
  let scrolled = document.scrollingElement.scrollTop;
  console.log(scrolled);
  if (scrolled > 300) {
    content.classList.add("mini");
  } else {
    content.classList.remove("mini");
  }
});

const getArticles = (url) => {
  $(document).ready(() => {
    $.ajax(url, {
      success: (data) => contentArticles(data),
      error: (error) => console.log(error),
    });

    $(".video-item").on("click", function (event) {
      var link = $(this).data("link");

      $("#video").html(
        '</div><iframe width="560" height="315" src="' +
          link +
          '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      );
    });
  });
};
const contentArticles = (articles) => {
  const template = $(".noticias");
  const exclusive = $(".box-exclusive");
  let template2 = "";
  let exclusive2 = "";
  articles.articles.forEach((article, index) => {
    const { title, description, url, urlToImage } = article;
    if (index == 0) {
      exclusive.html(`<article id="exclusive">
                        <a href="${url}" target="_blank"> 
                          <img
                            class="d-block w-100"
                            src=" ${urlToImage}"
                            alt=""
                          />
                        </a>
                      </article>
                      <div id="box-text">
                        <a href="#"
                          ><h6 style="color: brown;">
                            Exclusivo<br />
                          </h6>
                          <br />
                          <h4 style="color: red;">
                          ${title}
                          </h4>
                          <h7 style="color: black;"
                            >${description}</h7
                          ></a
                        >
                      </div>`);
    } else {
      template2 += ` 
        <article class="item-noticia col-md-6">
          <a href="${url}" target="_blank"
            ><h3 style="color: red;">
              ${title}
            </h3>
            <div class="item-noticia-imagem">
              <img
                class="d-block w-100"
                src=" ${urlToImage}"
                alt=""
              /></div
          ></a>
          ${description}
        </article>`;
    }
  });

  template.html(template2);
};

const contentBanners = () => {
  const banner = $("#carousel");
  let carouselInner = "";
  $.ajax(
    "http://newsapi.org/v2/top-headlines?country=br&category=business&from=2020-06-16&sortBy=publishedAt&apiKey=7809950b17ce46258a08cf73f1e71596",
    {
      success: (articles) => {
        articles.articles.forEach((article, index) => {
          if (index <= 3) {
            const { title, description, url, urlToImage } = article;
            carouselInner += ` 
              <div class="carousel-item ${index === 1 ? "active" : ""}">
                  <img
                  class="d-block w-100"
                  src="${urlToImage}"
                  alt="First slide"
                  />
                  <!-- Static Header -->
                  <div class="header-text hidden-xs">
                  <div class="col-md-12 text-center">
                      <h3>
                      <span>${title}</span
                      >
                      </h3>
                  </div>
                  </div>
                  <!-- /header-text -->
              </div>`;
          }
        });
        banner.html(carouselInner);
      },
    }
  );
};
const contentFamous = () => {
  const banner = $(".famous-noticia");
  let carouselInner = "";
  $.ajax(
    "http://newsapi.org/v2/top-headlines?country=br&category=entertainment&from=2020-06-16&sortBy=publishedAt&apiKey=7809950b17ce46258a08cf73f1e71596",
    {
      success: (articles) => {
        articles.articles.forEach((article, index) => {
          if (index <= 3) {
            const { title, description, url, urlToImage } = article;
            carouselInner += `
            <a href="${url}" target="_blank" class="famous-noticia-item">
                  <img
                      class="d-block"
                      src="${urlToImage}"
                      alt=""
                  />
                  <div class="text-box">
                  <h4 style="color: black;">${
                    title.length > 100 ? title.substr(0, 100) + `...` : title
                  } </h4>
                  <p>${description}</p>
                  </div>
            </a>
            <hr>`;
          }
        });
        banner.html(carouselInner);
      },
    }
  );
};

const getSource = () => {
  const menuSource = $("#news-source");
  var menuDinamico = "";
  $.ajax(
    "https://newsapi.org/v2/sources?&language=pt&country=br&apiKey=7809950b17ce46258a08cf73f1e71596",
    {
      success: (sources) => {
        console.log(sources);
        sources.sources.forEach((sources, index) => {
          const { name, url } = sources;
          menuDinamico += `<a href="${url}" target=_blank>${name}</a>`;
        });

        menuSource.html(menuDinamico);
      },
    }
  );
};
getSource();
getArticles(
  "http://newsapi.org/v2/top-headlines?country=br&category=business&from=2020-06-16&sortBy=publishedAt&apiKey=7809950b17ce46258a08cf73f1e71596"
);
contentFamous();
contentBanners();
const changeNoticeType = (type) => {
  getArticles(
    `http://newsapi.org/v2/top-headlines?country=br&category=${type}&from=2020-06-16&sortBy=publishedAt&domains=techcrunch.com&apiKey=7809950b17ce46258a08cf73f1e71596`
  );
};
