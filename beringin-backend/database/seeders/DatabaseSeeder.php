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

        // 2. Akun Siswa Utama (Nikita Wulandari)
        $nikita = User::create([
            'name' => 'Nikita Wulandari (XI PPLG 2)',
            'email' => 'nikita@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
        ]);

        // 3. Akun Siswa Pendukung
        $bayu = User::create([
            'name' => 'Bayu Pratama (XI PPLG 1)',
            'email' => 'siswa@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
        ]);

        // 4. Data Awal Laporan Pengaduan Sarpras SMKN 1 Beringin (Edisi Nikita Wulandari)
        Laporan::create([
            'user_id' => $nikita->id,
            'judul' => 'Stopkontak Dinding Ruang Rapat Meleleh & Berpercik',
            'deskripsi' => 'Stopkontak tanam dinding samping proyektor ruang rapat guru mengalami panas berlebih hingga casing plastik meleleh dan sempat memicu percikan listrik.',
            'lokasi' => 'Ruang Rapat Utama & Guru Gedung A Lt. 1',
            'kategori' => 'Kelistrikan & Keamanan',
            'foto' => null,
            'status' => 'diproses',
        ]);

        Laporan::create([
            'user_id' => $bayu->id,
            'judul' => 'Papan Tulis Whiteboard Ruang Teori 2 Retak Parah',
            'deskripsi' => 'Permukaan papan tulis whiteboard kelas XI PPLG 2 retak memanjang di bagian tengah sehingga spidol menyangkut dan tulisan sulit dihapus.',
            'lokasi' => 'Ruang Teori 2 (Kelas XI PPLG 2)',
            'kategori' => 'Ruang Belajar',
            'foto' => null,
            'status' => 'selesai',
        ]);

        Laporan::create([
            'user_id' => $nikita->id,
            'judul' => 'Pintu Gerbang Parkir Sepeda Motor Engsel Copot',
            'deskripsi' => 'Engsel gerbang besi bagian bawah area parkir siswa sebelah timur patah terlepas, gerbang sulit digeser dan berisiko roboh.',
            'lokasi' => 'Area Parkir Siswa Gerbang Timur',
            'kategori' => 'Sarana Keamanan',
            'foto' => null,
            'status' => 'menunggu',
        ]);
    }
}
