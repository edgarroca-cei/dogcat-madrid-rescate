export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  color: string;
  date: string;
  author: string;
  isExternal?: boolean;
  externalUrl?: string;
  sourceName?: string;
  fontSize?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "viaje-stella",
    title: "El Viaje de Stella a Casa",
    excerpt: "Vimos a Stella, una perrita tímida, sola y asustada en las calles. Sabíamos que teníamos que ayudarla a salir de ahí y recuperar su confianza.",
    content: `Vimos a Stella, una perrita tímida, sola y asustada en las calles. Sabíamos que teníamos que ayudarla a salir de ahí y recuperar su confianza.

El rescate no fue fácil. Stella había perdido la fe en los humanos y huía cada vez que intentábamos acercarnos. Fueron necesarios varios días de paciencia, dejándole comida y ganándonos su confianza poco a poco.

Finalmente, una tarde lluviosa, Stella decidió acercarse. Estaba empapada y temblando, pero en sus ojos vimos un destello de esperanza. La llevamos inmediatamente al veterinario, donde descubrimos que tenía desnutrición severa y algunas heridas superficiales.

Tras semanas de cuidados intensivos, buena alimentación y mucho cariño en su casa de acogida, Stella se transformó. Dejó de ser esa perrita asustadiza para convertirse en una compañera leal y juguetona.

Hoy, Stella ha encontrado su hogar definitivo con una familia maravillosa que la adora. Su historia es un recordatorio de por qué hacemos lo que hacemos: cada vida importa y cada rescate vale la pena.`,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200",
    color: "bg-brand-cream text-brand-dark",
    date: "12 de Marzo, 2026",
    author: "Equipo DOGCAT"
  },
  {
    id: "segunda-oportunidad-cooper",
    title: "La Segunda Oportunidad de Cooper",
    excerpt: "Cooper llegó a nosotros como un perro adulto, con una mirada que decía mucho. Tenía una dignidad tranquila, a pesar de sus altibajos.",
    content: `Cooper llegó a nosotros como un perro adulto, con una mirada que decía mucho. Tenía una dignidad tranquila, a pesar de sus altibajos. Había sido abandonado en una zona industrial, atado a una valla sin agua ni comida.

Cuando lo encontramos, estaba resignado. No ladraba, no lloraba; solo esperaba. Al liberarlo, nos miró con una mezcla de agradecimiento y tristeza que nos rompió el corazón.

En el refugio, Cooper demostró ser un perro excepcional. Tranquilo, obediente y muy cariñoso con los voluntarios. Sin embargo, su edad (estimamos que tenía unos 7 años) hacía que muchas familias pasaran de largo, buscando cachorros.

Pero la paciencia siempre tiene su recompensa. Una pareja de jubilados, que buscaba un compañero tranquilo para sus paseos diarios, se enamoró de él a primera vista. La conexión fue instantánea.

Ahora Cooper disfruta de largos paseos por el parque, siestas al sol y todo el amor que siempre mereció. Su historia nos enseña que nunca es tarde para una segunda oportunidad y que los perros adultos son compañeros extraordinarios.`,
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1200",
    color: "bg-brand-green text-brand-dark",
    date: "5 de Marzo, 2026",
    author: "María (Voluntaria)"
  },
  {
    id: "rescate-colonia-parque",
    title: "El Rescate de la Colonia del Parque",
    excerpt: "Una operación nocturna para asegurar el bienestar de más de 15 gatos que vivían en condiciones precarias. Así logramos estabilizarlos.",
    content: `Una operación nocturna para asegurar el bienestar de más de 15 gatos que vivían en condiciones precarias. Así logramos estabilizarlos.

Recibimos el aviso de unos vecinos preocupados: una colonia de gatos en un parque local estaba creciendo descontroladamente y muchos de los animales presentaban signos de enfermedad. Sabíamos que teníamos que actuar rápido aplicando el método C.E.R. (Captura, Esterilización y Retorno).

Organizamos un equipo de voluntarios experimentados y, durante tres noches consecutivas, nos instalamos en el parque con jaulas trampa, comida irresistible y mucha paciencia.

Logramos capturar a 18 gatos en total. Todos fueron llevados a nuestra clínica veterinaria colaboradora, donde se les realizó un chequeo completo, se les desparasitó, vacunó y esterilizó. Afortunadamente, la mayoría solo necesitaba buena alimentación y cuidados básicos.

Tres de los gatos, que resultaron ser muy sociables, fueron puestos en adopción y ya han encontrado hogares. Los otros 15 fueron retornados a su colonia, que ahora está controlada y supervisada por alimentadores autorizados.

Este éxito no habría sido posible sin la colaboración ciudadana y el incansable trabajo de nuestros voluntarios. ¡Seguimos trabajando por el bienestar felino!`,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200",
    color: "bg-brand-light text-brand-dark",
    date: "28 de Febrero, 2026",
    author: "Equipo C.E.R."
  }
];
