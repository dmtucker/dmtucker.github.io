var geneID = 'myc';
var virusGeneID = 'virusGene';

var mitosis;
var cancer;

var tumorCellCount = 0;
var tumorRadius = 0.2;
var tumorAngle = 0;

function makeTumor ( ) {
    tumorCellCount += 1;
    var tumorPolymeraseID = 'polymerase'+tumorCellCount.toString();
    var tumorCellID = 'cancerCell'+tumorCellCount.toString();
    $('#hook').append('<img id="'+tumorPolymeraseID+'" class="polymerase" src="/~dmtucker/art80f/cancer/images/DNA_polymerase.png" alt="DNA Polymerase" style="width: 20em;">');
    $('#hook').append('<img id="'+tumorCellID+'" class="cell" src="/~dmtucker/art80f/cancer/images/cell_cancer.png" alt="Cancer Cell" style="width: '+(5+(tumorRadius/2)).toString()+'em;">');
    $('#'+tumorCellID).css('left', '25em'); 
    $('#'+tumorCellID).css('top', '40em');
    $('#'+tumorPolymeraseID)
        .fadeIn('fast')
        .animate(
            {top: '35em'},
            200,
            'swing',
            function ( ) {
                var x = tumorRadius*Math.cos(tumorAngle);
                var y = tumorRadius*Math.sin(tumorAngle);
                tumorRadius += 0.08;
                tumorAngle += 1;
                $('#'+tumorCellID)
                    .fadeIn('fast')
                    .animate(
                        {left: (60+x).toString()+'em', top: (35-y).toString()+'em'},
                        100,
                        'swing',
                        function ( ) {
                            $('#'+tumorPolymeraseID).animate(
                                {top: '100em'},
                                200,
                                'swing',
                                function ( ) {
                                    $('#'+tumorPolymeraseID).remove();
                                }
                            );
                        }
                    );
            }
        );
        // Cancer cells are removed in removeCancer.
}

function removeCancer ( ) {
    stop(cancer);
    setTimeout(
        function ( ) {
            tumorRadius = 0.2;
            tumorAngle = 0;
            while (tumorCellCount > 0) {
                var tumorCellID = 'cancerCell'+tumorCellCount.toString();
                var tumorPolymeraseID = 'polymerase'+tumorCellCount.toString();
                $('#'+tumorPolymeraseID).remove();
                $('#'+tumorCellID)
                    .delay(100)
                    .fadeOut(
                        'fast',
                        function ( ) {
                            $('#'+tumorCellID).remove();
                        }
                    );
                tumorCellCount -= 1;
            }
            $('#virusGene')
                .delay(1000)
                .fadeOut(
                    'slow',
                    function ( ) {
                        $('#virusGene').remove();
                    }
                );
            mitosis = repeat(makeCell,3000);
        },
        1000
    );
}

function makeCell ( ) {
    var DNApolymeraseID = 'normalPolymerase';
    var cellID = 'normalCell';
    $('#hook').append('<img id="'+DNApolymeraseID+'" class="polymerase" src="/~dmtucker/art80f/cancer/images/DNA_polymerase.png" alt="DNA Polymerase" style="width: 20em;">');
    $('#hook').append('<img id="'+cellID+'" class="cell" src="/~dmtucker/art80f/cancer/images/cell.png" alt="Cell" style="width: 10em;">');
    $('#'+DNApolymeraseID)
        .fadeIn('fast')
        .animate(
            {top: '35em'},
            2000,
            'swing',
            function ( ) {
                $('#'+cellID).css('left', '25em'); 
                $('#'+cellID).css('top', '40em');
                $('#'+cellID)
                    .fadeIn('fast')
                    .animate(
                        {left: '120em'},
                        1000,
                        'swing',
                        function ( ) {
                            $('#'+cellID).remove();
                        }
                    );
                $('#'+DNApolymeraseID).animate(
                    {top: '100em'},
                    2000,
                    'swing',
                    function ( ) {
                        $('#'+DNApolymeraseID).remove();
                    }
                );
            }
        );
}

function introduceVirusGene ( ) {
    $('#hook').append('<img id="'+virusGeneID+'" src="/~dmtucker/art80f/cancer/images/magnet.png" alt="Virus Gene" style="width: 15em;">');
    $('#'+virusGeneID)
        .delay(500)
        .fadeIn(
            'slow',
            function ( ) {
                stop(mitosis);
                cancer = repeat(makeTumor,500);
            }
        );
        // The virus gene is removed in removeCancer.
}

function introduceVirusRNA ( ) {
    var virusRNAID = 'virusRNA';
    $('#hook').append('<img id="'+virusRNAID+'" src="/~dmtucker/art80f/cancer/images/RNA.png" alt="Virus RNA" style="width: 20em;">');
    $('#'+virusRNAID)
        .fadeIn('slow',introduceVirusGene)
        .delay(1000)
        .fadeOut(
            'slow',
            function ( ) {
                $('#'+virusRNAID).remove();
            }
        );
}

function introduceVirus ( ) {
    var virusID = 'virus';
    $('#hook').append('<img id="'+virusID+'" src="/~dmtucker/art80f/cancer/images/virus.png" alt="Virus" style="width: 20em;">');
    $('#'+virusID)
        .fadeIn('slow')
        .animate(
            {top: '20em', left: '18em'},
            500,
            'swing',
            introduceVirusRNA
        )
        .delay(1000)
        .animate(
            {top: '40em', left: '-18em'},
            'slow',
            function ( ) {
                $('#'+virusID).remove();
            }
        );
}

function beginAnimation ( ) {
    $('#hook').append('<img id="'+geneID+'" src="/~dmtucker/art80f/cancer/images/jeans.png" alt="Myc Gene" style="width: 10em;">');
    $('#'+geneID).fadeIn('slow');
    
    $('#warning').delay(12000).fadeIn('slow');
    mitosis = repeat(makeCell, 3000);
}

function endAnimation ( ) {
    stop(mitosis);
    
    var geneID = 'myc';
    $('#'+geneID).fadeOut(
        'slow',
        function ( ) {
            $('#'+geneID).remove();
        }
    );
}

function triggerSurgery ( ) {
    $('#trigger').text('Tumorectomy!');
    $('#trigger').click(
        function ( ) {
            $('#trigger').off()
            $('#trigger').fadeOut('fast',triggerCancer);
            removeCancer();
        }
    );
    $('#trigger').delay(32000).fadeIn('fast');
}

function triggerCancer ( ) {
    $('#trigger').text('Introduce Cancer');
    $('#trigger').click(
        function ( ) {
            $('#trigger').off()
            $('#trigger').fadeOut('fast',triggerSurgery);
            introduceVirus();
        }
    );
    $('#trigger').delay(16000).fadeIn('slow');
}

$(document).ready(
    function ( ) {
        $('#trigger').click(
            function ( ) {
                $('#trigger').off()
                $('#trigger').fadeOut('fast',triggerCancer);
                beginAnimation();
            }
        );
    }
);
var s = skrollr.init({
    forceHeight: false
});