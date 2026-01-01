import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, '../public/images/projets');
const WIDTH = 600;  // Largeur max réduite
const QUALITY = 70; // Qualité WebP

async function optimizeImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.webp') && !f.includes('.backup'));
  
  console.log(`🌱 Optimisation éco-responsable des images WebOpoli`);
  console.log(`================================================`);
  console.log(`📐 Paramètres : ${WIDTH}px de large, qualité ${QUALITY}%\n`);
  console.log(`🖼️  ${files.length} images à optimiser\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const tempPath = inputPath + '.tmp';
    
    const originalSize = fs.statSync(inputPath).size;
    totalOriginal += originalSize;
    
    // Créer un backup si pas déjà fait
    const backupPath = inputPath.replace('.webp', '.backup.webp');
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }
    
    try {
      await sharp(inputPath)
        .resize(WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(tempPath);
      
      // Remplacer l'original
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
