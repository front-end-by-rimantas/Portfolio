"use strict";

/*
    1 - ar nurodyti visi kritiniai "input" kintamieji
        1.1 - tinkmasis tipas ir dydis (min/max)
    2 - ciklas
        2.1 - tikriname ar yra kritines objektu reiksmes
        2.2 - nekritinems reiksmems del viso pikto ir pasitikriname
            2.2.1 - jei nera nekritines reiksmes, tai "reset'inam"
        2.3 - konstruojame objekto HTML
    3 - graziname visko HTML
 */


/**
 * "Client carousell" HTML kodo generavimas
 * @param {object} logo_list - Nuotrauku sarasas
 * @returns {string} "Client carousell" HTML kodas
 */
function clientCarousell( logo_list ) {
    var HTML = '',
        failas = '';

    if ( typeof(logo_list) !== 'object' || logo_list.length < 1 ) {
        return HTML;
    }

    for ( var i=0; i<logo_list.length; i++ ) {
        failas = logo_list[i].file_name;
        // console.log( logo_list[i] );
        // console.log( logo_list[i].file_name );
        // console.log( logo_list[i].alt );
        // console.log( logo_list[i]['file_name'] );
        // console.log( logo_list[i]['alt'] );
        if ( typeof( failas ) === 'string' && failas.length > 4 ) {
            HTML += '<div style="background-image: url(img/clients-carousell/'+ failas +');" alt="'+ logo_list[i].alt +'"></div>';
        }
    }

    return HTML+HTML;
}

/**
 * Render cards
 * @param {object} card_list - Cards list (array)
 * @returns {string} Cards HTML
 */
function renderCards( card_list ) {
    var HTML = '',
        card;

    if ( typeof(card_list) !== 'object' ||
         card_list.length < 1 ) {
        return HTML;
    }
    
    for ( var i=0; i<card_list.length; i++ ) {
        card = card_list[i];
        // console.log( card );

        if ( typeof( card.icon ) === 'string' &&
             card.icon.length > 0 &&
             typeof( card.number ) === 'number' &&
             typeof( card.text ) === 'string' &&
             card.text.length > 0 ) {
    
            HTML += `<div class="card">
                        <div class="icon">
                            <i class="fa fa-${card.icon}"></i>
                        </div>
                        <div class="number">${card.number}</div>
                        <h4>${card.text}</h4>
                    </div>`;
        }

        if ( typeof( card.icon ) === 'string' &&
             card.icon.length > 0 &&
             typeof( card.text ) === 'string' &&
             card.text.length > 0 &&
             typeof( card.p ) === 'string' &&
             card.p.length > 0 ) {
    
            HTML += `<div class="card">
                        <div class="icon">
                            <i class="fa fa-${card.icon}"></i>
                        </div>
                        <h4>${card.text}</h4>
                        <p>${card.p}</p>
                    </div>`;
        }
    }

    return HTML;
}


/**
 * Render jobs
 * @param {object} jobs_list - Jobs list (array)
 * @returns {string} Jobs HTML
 */
function renderJobs( jobs_list ) {
    var HTML = '',
        job,
        job_date_to = '',
        address = '',
        description = '';

    if ( typeof(jobs_list) !== 'object' ||
         jobs_list.length < 1 ) {
        return HTML;
    }

    for ( var i=0; i<jobs_list.length; i++ ) {
        job = jobs_list[i];
        job_date_to = '',
        address = '';
        description = '';

        if ( typeof( job.position_title ) === 'string' &&
             job.position_title.length > 0 &&
             typeof( job.date ) === 'object' &&
             typeof( job.date.from ) === 'string' &&
             job.date.from.length > 0 ) {
    
            if ( !job.date.to ) {
                job_date_to = 'Present';
            } else {
                job_date_to = job.date.to;
            }
            if ( job.address ) {
                address = job.address;
            }
            if ( job.description ) {
                description = job.description;
            }
            HTML += `<div class="job">
                        <div class="top">
                            <div class="titles">
                                <h4>${job.position_title}</h4>
                                <address>${address}</address>
                            </div>
                            <div class="btn">${job.date.from} to ${job_date_to}</div>
                        </div>
                        <p>${description}</p>
                    </div>`;
        }
    }

    return HTML;
}



var margin_left = 0;

function clientAnimation() {
    var shift = 20;
    
    margin_left = margin_left - shift;

    if ( margin_left === -120 ) {
        margin_left = 0;
        $( ".client-carousell > div > div" ).css("margin-left", margin_left+'%');
    } else {
        $( ".client-carousell > div > div" ).animate({ "margin-left": margin_left+'%' }, "slow");
    }

    return;
}


/**
 * Testimonials
 * @param {object} data - Testinomials list (array)
 * @param {number} index - Index of default visible testimonial
 * @returns {string} Testimonials HTML
 */
function renderTestimonials( data, index ) {
    var HTML = '',
        testimonial,
        HTML_stars = '',
        position = 0;

    if ( typeof(data) !== 'object' ||
        data.length < 1 ) {
        return HTML;
    }

    if ( typeof(index) !== 'number' ||
        index < 1 ||
        index > data.length ) {
        index = 1;
    }

    for ( var i=-1; i<data.length+1; i++ ) {
        // making clones before / after original testimonials
        if ( i === -1 ) {
            position = data.length-1;
        } else {
            position = i % data.length;
        }
        testimonial = data[position];

        if ( typeof(testimonial.author) === 'string' &&
             testimonial.author.length > 0 &&
             typeof(testimonial.text) === 'string' &&
             testimonial.text.length > 0 ) {
            
            HTML_stars = '';
            for ( var z=0; z<testimonial.stars; z++ ) {
                HTML_stars += '<div class="fa fa-star"></div>';
            }
            // comment loop (for) below, if want to display only given stars
            for ( var z=0; z<5-(testimonial.stars); z++ ) {
                HTML_stars += '<div class="fa fa-star-o"></div>';
            }

            HTML += `<div class="item"  style="width: ${100/(data.length+2)}%;">
                        <div class="quote">99</div>
                        <h4>${testimonial.author}</h4>
                        <div class="stars">${HTML_stars}</div>
                        <p>${testimonial.text}</p>
                    </div>`;
        }
    }

    $('#testimonials > .list').css('width', 100*(data.length+2)+'%').css('margin-left', (-100*index)+'%');

    // update bar position
    var bar_margin = (100 / data.length) * (index - 1);
    $('#testimonials > .tools > .bar > .scroll').css('margin-left', bar_margin+'%');

    return HTML;
}

/**
 * Rendering project widget with filtering functionality
 * @param {object} data - Project list (array)
 * @returns {string} Projects HTML
 */
function renderProjects( data ) {
    var HTML = '',
        HTML_categories = '',
        HTML_items = '',
        HTML_tags = '',
        unique_tags = [],
        all_tags = [];
    
    if ( typeof(data) !== 'object' ||
         data.length < 1 ) {
        return '';
    }

    for ( var i=0; i< data.length; i++ ) {
        if ( typeof(data[i].img) === 'string' &&
             data[i].img.length > 0 &&
             typeof(data[i].name) === 'string' &&
             data[i].name.length > 0 &&
             data[i].tags.length > 0 ) {
            HTML_tags = '';
            for ( var t=0; t< data[i].tags.length; t++ ) {
                HTML_tags += `<div class="tag">${data[i].tags[t]}</div>`;
                all_tags.push(data[i].tags[t]);
            }
            HTML_items += `<a href="${data[i].url}" class="item" style="background-image: url(img/projects/${data[i].img});">
                                <div class="texts">
                                    <div class="project-name">${data[i].name}</div>
                                    <div class="tags">${HTML_tags}</div>
                                </div>
                                <div class="background"></div>
                            </a>`;
        }
    }

    // is unikaliu tagu konstruojame filtra
    var tags_count = all_tags.length;
    for ( var i=0; i<tags_count; i++ ) {
        // jeigu einamojo tago dar neturiu tarp unikaliu tagu saraso - pridedu/itraukiu
        if ( !unique_tags.includes( all_tags[i] ) ) {
            unique_tags.push(all_tags[i]);
        }
    }

    for ( var i=0; i<unique_tags.length; i++ ) {
        HTML_categories += `<div class="option">${unique_tags[i]}</div>`;
    }

    HTML = `<div class="filter">
                <div class="option active">All categories</div>
                ${HTML_categories}
            </div>
            <div class="list">
                ${HTML_items}
            </div>`;

    return HTML;
}