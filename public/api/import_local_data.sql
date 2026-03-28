-- Script Opcional: Importar datos locales a Hostinger
-- Solo ejecuta esto si quieres subir los datos de tu database.json local a la web.
-- ¡Atención! Esto podría duplicar entradas si ya existen.

-- Borrar datos existentes (Opcional, descomenta si quieres limpiar antes de importar)
-- DELETE FROM posts;
-- DELETE FROM mapas;
-- DELETE FROM site_content;

-- Importar Posts
INSERT INTO posts (id, title, slug, excerpt, content, image, color, date, author, createdAt) VALUES 
('3jvzqy6ff', 'Rescate nocturno en el centro', 'rescate-nocturno-centro', 'Una noche intensa ayudando a un cachorro atrapado en una obra. Gracias al aviso de un vecino pudimos actuar rápido.', '<p>Fue una noche larga pero valió la pena. Recibimos el aviso a las 2 AM sobre un cachorro que lloraba en una zona de obras vallada. Tras coordinarnos con la policía local, pudimos acceder y rescatar al pequeño Toby, que ahora descansa seguro en nuestra casa de acogida.</p>', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200', 'bg-brand-cream text-brand-dark', '2026-03-25T10:03:54.574Z', 'Equipo DOGCAT', '2026-03-25T10:03:54.614Z'),
('kg28uiepp', 'Nueva colonia gestionada en Vallecas', 'colonia-vallecas-gestion', 'Gracias a los voluntarios hemos comenzado la gestión CER en una nueva zona con más de 20 felinos.', '<p>La expansión de nuestro programa CER continúa. Esta semana hemos empezado el censo y las primeras capturas en una zona industrial de Vallecas. Es un reto grande pero contamos con un equipo increíble de alimentadores autorizados.</p>', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200', 'bg-brand-green text-brand-dark', '2026-03-25T10:03:54.574Z', 'Unidad CER', '2026-03-25T10:03:54.628Z'),
('w7bkaq86u', 'Consejos para el calor con tus mascotas', 'consejos-calor-mascotas', 'Cómo mantener a tus perros y gatos frescos este verano. Evita golpes de calor con estas pautas sencillas.', '<p>Con la llegada de la ola de calor, es vital recordar: nunca dejes a tu mascota en el coche, mantén agua fresca siempre disponible y evita los paseos en las horas centrales del día por el asfalto caliente.</p>', 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=1200', 'bg-brand-light text-brand-dark', '2026-03-25T10:03:54.574Z', 'Salud Animal', '2026-03-25T10:03:54.633Z'),
('9okq5sudd', 'Entrevista con nuestra veterinaria', 'entrevista-veterinaria-dogcat', 'Hablamos sobre la importancia de las revisiones anuales y la vacunación preventiva en animales rescatados.', '<p>Hoy charlamos con Ana, nuestra veterinaria colaboradora, sobre los retos de salud más comunes que encontramos en la calle y cómo una detección temprana puede salvar vidas.</p>', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200', 'bg-brand-cream text-brand-dark', '2026-03-25T10:03:54.574Z', 'Redacción', '2026-03-25T10:03:54.636Z'),
('om2kt2pf0', 'Final feliz para Luna', 'final-feliz-luna', 'Tras 6 meses en el refugio, Luna por fin ha encontrado su hogar definitivo con una familia maravillosa.', '<p>No hay nada que nos llene más que ver estas fotos de Luna durmiendo en su nuevo sofá. Después de su largo proceso de recuperación, por fin tiene la estabilidad y el amor que siempre mereció.</p>', 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1200', 'bg-brand-green text-brand-dark', '2026-03-25T10:03:54.574Z', 'Adopciones', '2026-03-25T10:03:54.638Z')
ON DUPLICATE KEY UPDATE title=VALUES(title), content=VALUES(content), image=VALUES(image);

-- Importar Mapas
INSERT INTO mapas (id, title, mid, description, icon, `order`, createdAt) VALUES 
('x45pbbs9w', 'Subvenciones 2025', '1uN0B5g0B0Ov_e7aO-LRi0y1jCudun5o', 'Mapa de subvenciones para entidades locales en la convocatoria 2025.', 'Map', 1, '2026-03-25T10:03:10.525Z'),
('andq5yxmd', 'Subvención Estatal Madrid', '15nYt5nqHaz7tlOCxRHZWDEwkjJwelbs', 'Mapa específico de subvenciones estatales para entidades locales en Madrid.', 'Building2', 2, '2026-03-25T10:03:10.533Z'),
('rnbs6cuoy', 'Licitaciones y Contratos', '1q6X-VYbUSUqpDXadtFH6Qw_Uz_ff_UQ', 'Mapa de licitaciones y contratos menores relacionados con colonias felinas.', 'FileText', 3, '2026-03-25T10:03:10.537Z'),
('0dn2g6ts8', 'Gatos Perdidos Madrid', '1J9bg7ZYkPDy7unW2ee77Q4FGlKK2tVR6', 'Registro histórico de gatos perdidos en la Comunidad de Madrid (2014-2020).', 'Search', 4, '2026-03-25T10:03:10.540Z'),
('39bu9l4jp', 'Clínicas y Hospitales Veterinarios', '1cp8NLo2PU9w6Aa4si3Uc-yrvsXE-VEs', 'Centros veterinarios y hospitales de urgencia 24h en Madrid.', 'Hospital', 5, '2026-03-25T10:03:10.543Z')
ON DUPLICATE KEY UPDATE title=VALUES(title), mid=VALUES(mid), description=VALUES(description);
