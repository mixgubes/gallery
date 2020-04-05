'use strict'

function initPage() {
    renderGallery();
    renderGalleryModal()
}

function renderGallery() {
    var counter = 1;
    var projects = getProjectsToDisplay();
    var srtHTML = '';

    projects.map(project => {
         srtHTML += `
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${counter/*should be onclick="onRenderGalleryModal(${project},${counter})"*/}">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="img/portfolio/0${counter}-thumbnail.jpg" alt="">
            </a>
            <div class="portfolio-caption">
                <h4>${project.name}</h4>
                <p class="text-muted">${project.title}</p>
            </div>
        </div>`;
        counter++;
    });

    $('.gallery-container').html(srtHTML);
}

function renderGalleryModal() {
    var counter = 1;
    var projects = getProjectsToDisplay();
    var strHTML = '';

    projects.map(project => {
    strHTML += `
        <div class="portfolio-modal modal fade" id="portfolioModal${counter}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <h2>${project.name}</h2>
                    <p class="item-intro text-muted">${project.title}.</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/0${counter}-full.jpg" alt="">
                    <p>${project.desc}</p>
                    <ul class="list-inline">
                      <li>${project.publishedAt}</li>
                      <li>Client: Threads</li>
                      <li>Category: ${project.labels}</li>
                    </ul>
                    <a href="${project.url}" class="btn btn-primary"  type="button">Open ${project.name}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
      counter++;
    });
      $('.modal-container').html(strHTML)
}