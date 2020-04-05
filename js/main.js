'use strict'
console.log('Starting up');

var gProjects;

function getProjectsToDisplay() {
    createProjects()
    return gProjects
}

function createProjects(){
    var mineSweeper = createProject('mineSweeper', 'Mine Sweeper', 'Watch your step',
    'Expose all the board without touching the mines', '../projs/mineSweeper/index.html', null, 
    ['Matrixes', 'Mouse events', 'Recursion', 'Design']);
    
    var simon = createProject('simon', 'Simon', 'When simon says you ask how high',
    'Follow simon steps and copy them', '../projs/simon/game.html', null, 
    ['Mouse events', 'Design']);

    var bookShop = createProject('bookShop', 'Book Shop', 'Books is steimatzky', 
    'read and rate my books (you can even update their price)', '../projs/orGubesBooksShop/index.html', null, ['Inputs', 'Design']);

    gProjects = [mineSweeper, simon, bookShop];
    return gProjects
}

function createProject(id, name, title, desc, url, publishedAt, labels){
    var project = {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: publishedAt,
        labels: labels
    }
    return project
}