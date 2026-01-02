import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, '../public/images/projets');

// Tailles cibles pour éco-index A
// Sur mobile : max 400px, sur desktop dans une grille 3 colonnes : ~400px aussi
const WIDTH = 400;  // Réduit de 600 à 400
const QUALITY = 65; // Réduit de 70 à 65

async function optimizeImages() {
  const files = fs.readdirSync(inputDir).filter(f => 
    f.endsWith('.webp') && !f.includes('.backup')
  );
  
  console.log(`🌱 Optimisation éco-responsable des images WebOpoli`);
  console.log(`================================================`);
  console.log(`📐 Paramètres : ${WIDTH}px de large, qualité ${QUALITY}%\n`);
  console.log(`🖼️  ${files.length} images à optimiser\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const backupPath = inputPath.replace('.webp', '.backup.webp');
    const tempPath = inputPath + '.tmp';
    
    // Utiliser le backup comme source si disponible (meilleure qualité)
    const sourcePath = fs.existsSync(backupPath) ? backupPath : inputPath;
    const originalSize = fs.statSync(sourcePath).size;
    totalOriginal += originalSize;
    
    try {
      await sharp(sourcePath)
        .resize(WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 }) // effort 6 = meilleure compression
        .toFile(tempPath);
      
      fs.renameSync(tempPath, inputPath);
      
      const newSize = fs.statSync(inputPath).size;
      totalOptimized += newSize;
      
      const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`✅ ${file}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (-${saved}%)`);
    } catch (err) {
      console.error(`❌ Erreur sur ${file}:`, err.message);
      totalOptimized += originalSize;
    }
  }
  
  console.log(`\n📊 Résumé:`);
  console.log(`   Original: ${(totalOriginal/1024/1024).toFixed(2)} MB`);
  console.log(`   Optimisé: ${(totalOptimized/1024/1024).toFixed(2)} MB`);
  console.log(`   Économie: ${((totalOriginal - totalOptimized)/1024/1024).toFixed(2)} MB (${((totalOriginal - totalOptimized)/totalOriginal * 100).toFixed(1)}%)`);
  console.log(`\n✅ Optimisation terminée !`);
}

optimizeImages().catch(console.error);
