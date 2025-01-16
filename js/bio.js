// /js/bio.js
document.addEventListener('DOMContentLoaded', function() {


    // Definitions for expandable terms
    const definitions = {
        '4dprinting': '\
        From thermoplastics that deform with heat to natural materials like wood and pasta flour that respond to water by bending and swelling, a diverse range of materials exhibit responsive shape-changing properties. By leveraging advanced manufacturing techniques such as 3D printing and CNC machining, we can program specific shape transformations into these materials, creating objects that autonomously transform into predetermined configurations when exposed to environmental stimuli.\
        <p>Related projects:   <a href="https://morphingmatter.org/projects/thermorph">Thermoprh</a>,   <a href="https://morphingmatter.org/projects/geodesy">Geodesy</a></p>\
        ',
        'truss': '\
        <a href="https://www.sciencedirect.com/science/article/abs/pii/0094576585901316">Variable Geometry Truss (VGT)</a> systems , composed of actuating beams connected by joints in tetrahedral or octahedral configurations, offer unique advantages in achieving complex shape transformations. They have high degrees of freedom and volume-to-weight ratio. Each actuating beam enables precise control over volumetric transformations, including rotation, twisting, and linear extension. However, these systems face significant scalability challenges as control complexity increases exponentially with the number of actuators.\
        We developed actuator grouping mechanisms and specialized optimizers to minimize control system complexity while maintaining morphological capabilities. We further transformed discrete truss structures into continuous latent representations with <a href="https://en.wikipedia.org/wiki/Variational_autoencoder">VAE</a>, enabling efficient topology optimization - a task traditionally challenging due to the non-Euclidean and discrete nature of truss structures.\
        <p>Related projects:   <a href="https://morphingmatter.org/projects/pneumesh">Pneumesh</a>,   <a href="mailto:jianzheg@andrew.cmu.edu?subject=Paper Inquiry&body=Hey Jianzhe, I am interested in the paper \'Muscle Synergy Evolution in Actuator Networks\'. Can you provide me with more information?"">MetaTruss (on request)</a></p>'
    };

    // Create and insert definition elements
    document.querySelectorAll('.expandable-term').forEach(term => {
        const definition = document.createElement('div');
        definition.className = 'definition';
        definition.innerHTML = definitions[term.dataset.term]; // Using innerHTML instead of textContent
        term.appendChild(definition);

        // Toggle definition visibility
        term.addEventListener('mouseover', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.definition').forEach(def => {
                def.classList.remove('active');
            });
            definition.classList.toggle('active');
        });
    });

    // Close definitions when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.definition').forEach(def => {
            def.classList.remove('active');
        });
    });
});