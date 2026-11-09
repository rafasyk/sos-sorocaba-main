var trilho = document.getElementById('slides');
var slides = trilho.querySelectorAll('.slide');
var pontos = document.getElementById('pontos');
var atual = 0;

slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Ir para o ODS ' + (i + 1));
        b.addEventListener('click', function () { ir(i); });
        pontos.appendChild(b);
    });

function ir(i) {
        atual = (i + slides.length) % slides.length;
        trilho.scrollTo({ left: slides[atual].offsetLeft - trilho.offsetLeft, behavior: 'smooth' });
        marcar();
    }

function marcar() {
        pontos.querySelectorAll('button').forEach(function (b, i) {
            b.classList.toggle('ativo', i === atual);
        });
    }
    trilho.addEventListener('scroll', function () {
        var i = Math.round(trilho.scrollLeft / trilho.clientWidth);
        if (i !== atual) { atual = i; marcar(); }
    });
    document.getElementById('ant').addEventListener('click', function () { ir(atual - 1); });
    document.getElementById('prox').addEventListener('click', function () { ir(atual + 1); });
    marcar();
