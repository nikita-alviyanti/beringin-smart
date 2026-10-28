<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Laporan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Petugas Sarpras
        $petugas = User::create([
            'name' => 'Bu Ratna (Staf Pengelola Sarpras)',
            'email' => 'petugas@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'petugas',
        ]);

        // 2. Akun Siswa Utama
        $siswa = User::create([
            'name' => 'Nikita Wulandari (XI PPLG 2)',
            'email' => 'nikita@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
        ]);

        // 3. Akun Siswa Pendukung
        $teman = User::create([
            'name' => 'Bayu Pratama (XI PPLG 1)',
            'email' => 'siswa@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
        ]);

        // 4. Data Awal Laporan Pengaduan Sarpras (Edisi Nikita)
        Laporan::create([
            'user_id' => $siswa->id,
            'nama' => 'Stopkontak Dinding Ruang Rapat Meleleh & Berpercik',
            'lokasi' => 'Ruang Rapat Utama & Guru Gedung A Lt. 1',
            'kategori' => 'Laboratorium',
            'deskripsi' => 'Stopkontak tanam dinding samping proyektor ruang rapat guru mengalami panas berlebih hingga casing plastik meleleh dan sempat memicu percikan listrik.',
            'status' => 'Sedang Diproses',
        ]);

        Laporan::create([
            'user_id' => $teman->id,
            'nama' => 'Papan Tulis Whiteboard Ruang Teori 2 Retak Parah',
            'lokasi' => 'Ruang Teori 2 (Kelas XI PPLG 2)',
            'kategori' => 'Fasilitas Kelas',
            'deskripsi' => 'Permukaan papan tulis whiteboard kelas XI PPLG 2 retak memanjang di bagian tengah sehingga spidol menyangkut dan tulisan sulit dihapus.',
            'status' => 'Selesai',
        ]);

        Laporan::create([
            'user_id' => $siswa->id,
            'nama' => 'Pintu Gerbang Parkir Sepeda Motor Engsel Copot',
            'lokasi' => 'Area Parkir Siswa Gerbang Timur',
            'kategori' => 'Lingkungan/Taman',
            'deskripsi' => 'Engsel gerbang besi bagian bawah area parkir siswa sebelah timur patah terlepas, gerbang sulit digeser dan berisiko roboh.',
            'status' => 'Menunggu',
        ]);
    }
}
