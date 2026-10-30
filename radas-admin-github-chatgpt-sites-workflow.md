# Radas Admin — GitHub Source Control & ChatGPT Sites Workflow

**Status:** Belum dimulakan  
**Tujuan:** Sambung kerja bila ada masa lapang.  
**Pilihan yang dipersetujui:** **Option A — GitHub untuk source code, ChatGPT Sites kekal sebagai hosting.**

> Dokumen ini ialah checklist kerja. Tiada perubahan repository, hosting, binding, atau data production dibuat semasa menyediakan pelan ini.

## 1. Matlamat

- Simpan source code Admin dalam GitHub supaya perubahan boleh dijejak melalui commit.
- Kekalkan ChatGPT Sites sebagai hosting untuk Admin.
- Kekalkan Site asal dan sambungan storage asal.
- Asingkan source Admin daripada source landing page/routing Vercel.
- Sediakan backup data dan media sebelum sebarang ujian yang mungkin menulis ke production.

## 2. Aset dan repo yang dikenal pasti

- **Backup repo:** https://github.com/wancupie-netizen/radas-system-backup
- **Backup README:** https://github.com/wancupie-netizen/radas-system-backup/blob/main/BACKUP-README.md
- **Folder source Admin:** https://github.com/wancupie-netizen/radas-system-backup/tree/main/radas-admin
- **Folder source Landing:** https://github.com/wancupie-netizen/radas-system-backup/tree/main/radas-landing
- **Admin Site:** https://radas-buku-forex-crypto.hawaiskandar.chatgpt.site/admin
- **Public landing/routing:** https://radas.my/

### Struktur repo yang dicadangkan

| Repo | Tujuan | Tindakan |
|---|---|---|
| `radas-system-backup` | Arkib backup asal | Jadikan private selepas pengesahan; kekalkan sebagai arkib dan jangan guna untuk kerja harian |
| `radas-admin` | Source rasmi Admin ChatGPT Sites | Cipta sebagai private repo atau gunakan repo private sedia ada jika dipersetujui |
| `radas-landing` | Landing page dan routing yang dihoskan di Vercel | Kekalkan berasingan; jangan ubah sebagai sebahagian kerja Admin ini |

**Penting:** Jangan tukar visibility repo atau buat perubahan pada GitHub sehingga kau bersedia dan mengesahkan tindakan itu.

## 3. Perkara teknikal penting

Dalam source Admin, fail `.openai/hosting.json` mengandungi konfigurasi projek dan binding storage yang perlu dikekalkan:

```json
{
  "project_id": "appgprj_6add390ae01c819196d758a1db079647",
  "d1": null,
  "r2": "BUCKET"
}
```

- Kekalkan `project_id` Site asal.
- Kekalkan binding `BUCKET` yang sedia ada.
- **Jangan cipta Site baharu atau tukar binding storage** secara tidak sengaja.
- Data page, draft/published snapshots dan media disimpan dalam R2; ia tidak semestinya termasuk dalam backup source code.
- Source menunjukkan Node.js `>=22.13.0` dan `pnpm@11.25.0`. Semak semula `package.json` dan lockfile sebelum menjalankan arahan.
- Jangan commit `.env`, token, credentials, secrets, `.sites-runtime/`, `.wrangler/` atau state tempatan yang sensitif.

## 4. Pelan kerja mengikut fasa

### Fasa 1 — Semak dan selamatkan source

- [ ] Semak visibility repo `radas-system-backup`.
- [ ] Jika sesuai, tukar repo backup kepada **Private**.
- [ ] Kekalkan repo itu sebagai arkib asal; elakkan commit kerja harian ke dalamnya.
- [ ] Semak `.gitignore`, fail environment, secrets dan fail tempatan.
- [ ] Semak `package.json` dan lockfile untuk pastikan semua fail keperluan build ada.
- [ ] Pilih nama repo rasmi: `radas-admin`.
- [ ] Cipta repo `radas-admin` sebagai **Private**, atau tentukan repo private sedia ada yang akan digunakan.
- [ ] Pindahkan/salin source Admin daripada `radas-system-backup/radas-admin` dengan sejarah dan fail yang diperlukan, tanpa mengubah konfigurasi Site asal.

**Berhenti di sini jika ada secrets, fail penting yang hilang, atau konfigurasi yang tak jelas. Jangan teka.**

### Fasa 2 — Sahkan source Admin

Semak sekurang-kurangnya komponen berikut:

- [ ] `app/admin/manager.tsx` — pengurusan page/produk.
- [ ] `app/editor/editor.tsx` — editor kandungan.
- [ ] `app/api/pages/route.ts` — create, duplicate, save, publish/unpublish dan restore.
- [ ] `app/api/upload/route.ts` — upload imej ke R2.
- [ ] `app/api/public-page/route.ts` — paparan page yang diterbitkan.
- [ ] `app/chatgpt-auth.ts` — helper identiti ChatGPT.
- [ ] `lib/` — model kandungan, validation dan storage.
- [ ] `.openai/hosting.json` — project ID dan binding asal.
- [ ] `.gitignore`, `package.json` dan lockfile.

- [ ] Pastikan tiada rahsia atau credentials dimasukkan ke Git.
- [ ] Pastikan source boleh dipasang/build mengikut workflow ChatGPT Sites yang disokong semasa.

### Fasa 3 — Backup data R2 dan media

Sebelum menjalankan ujian yang mungkin menulis data:

- [ ] Kenal pasti cara rasmi untuk export/backup bucket R2 asal.
- [ ] Backup fail JSON page, draft, published snapshots dan media.
- [ ] Simpan backup di lokasi selamat yang berasingan daripada source repo.
- [ ] Sahkan backup boleh dibaca dan senaraikan kandungannya.
- [ ] Catat tarikh backup dan kaedah pemulihan.

**Jangan anggap GitHub source backup sudah melindungi data R2.** Jangan jalankan ujian upload/publish/restore pada production sebelum backup disahkan.

### Fasa 4 — Sambungkan workflow ChatGPT Sites

- [ ] Ikut dokumentasi dan workflow ChatGPT Sites semasa untuk menghubungkan source tempatan/repo.
- [ ] Pastikan ia menggunakan **Site asal**, bukan mencipta Site baharu.
- [ ] Pastikan `project_id` dan binding `BUCKET` masih sama.
- [ ] Semak perubahan konfigurasi yang dicadangkan sebelum menerima atau menyimpannya.
- [ ] Jalankan preview sahaja dahulu; **jangan deploy/publish production** pada fasa ini.

### Fasa 5 — Ujian preview

Uji tanpa mengubah data production jika boleh:

- [ ] Owner authentication/login.
- [ ] Senarai page sedia ada.
- [ ] Buka dan edit kandungan dalam preview/test data.
- [ ] Paparan page public yang telah diterbitkan.
- [ ] Upload imej hanya dalam persekitaran ujian yang selamat.
- [ ] Fungsi create/duplicate/save/publish/unpublish/restore diuji dengan data ujian.
- [ ] Semak log dan error.
- [ ] Pastikan landing page Vercel dan URL public tidak berubah.

Jika sesuatu ujian berpotensi menyentuh R2 production, hentikan ujian sehingga backup dan kaedah rollback jelas.

### Fasa 6 — Commit, deploy dan pengesahan akhir

- [ ] Commit perubahan kecil dengan mesej yang jelas.
- [ ] Semak diff sebelum setiap commit.
- [ ] Simpan versi Site yang diketahui stabil mengikut workflow yang disokong.
- [ ] Dapatkan pengesahan sebelum deploy/publish production.
- [ ] Selepas deploy yang diluluskan, uji login, senarai page, editor, paparan public dan upload yang berkaitan.
- [ ] Sahkan URL production masih sama.
- [ ] Rekod commit yang digunakan dan langkah rollback.

**Ingat:** Rollback source code tidak semestinya memulihkan data atau media yang telah diubah dalam R2. Pemulihan data perlu dirancang secara berasingan.

## 5. Kriteria siap

Kerja hanya dianggap selesai apabila:

- [ ] Source rasmi Admin berada dalam private GitHub repo.
- [ ] Repo backup asal kekal tersedia sebagai arkib private.
- [ ] Tiada secrets atau environment tempatan sensitif dalam Git.
- [ ] Source masih menggunakan Site asal dan binding R2 asal.
- [ ] Data dan media R2 mempunyai backup yang disahkan.
- [ ] Preview dan ujian asas lulus.
- [ ] Perubahan production dibuat hanya selepas kelulusan.
- [ ] Cara commit, deploy dan rollback didokumentasikan.

## 6. Perkara yang jangan dibuat tanpa semakan/kelulusan

- Jangan padam repo backup asal.
- Jangan jadikan source repo public.
- Jangan tukar `project_id` atau binding `BUCKET`.
- Jangan cipta Site baharu sebagai ganti Site asal.
- Jangan tukar hosting Admin ke Vercel/Cloudflare sebagai sebahagian pelan ini.
- Jangan ubah URL production atau routing `radas.my`.
- Jangan publish/deploy ke production tanpa pengesahan.
- Jangan jalankan operasi yang mengubah atau memadam R2 data tanpa backup dan pelan pemulihan.
- Jangan commit `.env`, API keys, tokens atau credentials.

## 7. Rujukan

- [Repo backup](https://github.com/wancupie-netizen/radas-system-backup)
- [README backup](https://github.com/wancupie-netizen/radas-system-backup/blob/main/BACKUP-README.md)
- [Source Admin dalam repo backup](https://github.com/wancupie-netizen/radas-system-backup/tree/main/radas-admin)
- [ChatGPT Sites — managing a site](https://learn.chatgpt.com/docs/sites/managing-a-site)
- [OpenAI Help Center — creating and using ChatGPT Sites](https://help.openai.com/en/articles/20001339-creating-and-using-chatgpt-sites)
- [GitHub Docs — changing repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)

---

## Nota untuk sesi akan datang

Bila nak sambung, buka fail ini dan beritahu ChatGPT:

> **Sambung pelan `Radas Admin — GitHub Source Control & ChatGPT Sites Workflow` daripada Fasa 1. Semak keadaan semasa dahulu. Jangan ubah visibility repo, production, Site binding atau data R2 tanpa minta pengesahan aku. Kekalkan ChatGPT Sites sebagai hosting.**

**Keutamaan pertama sesi seterusnya:** semak keadaan semasa repo dan source, kemudian buat satu perubahan pada satu masa. Jangan deploy dahulu.
