CREATE OR REPLACE FUNCTION SIJARTA.add_worker(
    _pekerja_id UUID,
    _kategori_jasa_id UUID
) RETURNS VOID AS $$
BEGIN
    INSERT INTO SIJARTA.PEKERJA_KATEGORI_JASA (PekerjaId, KategoriJasaId)
    VALUES (_pekerja_id, _kategori_jasa_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION SIJARTA.show_testimoni(
    _kategori_id UUID
) RETURNS TABLE (
    IdTrPemesanan UUID,
    Tgl DATE,
    Teks TEXT,
    Rating INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.IdTrPemesanan,
        t.Tgl,
        t.Teks,
        t.Rating
    FROM
        SIJARTA.TESTIMONI t
    INNER JOIN
        SIJARTA.TR_PEMESANAN_JASA p ON t.IdTrPemesanan = p.Id
    WHERE
        p.KategoriId = _kategori_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION SIJARTA.show_subkategori(
    nama VARCHAR
) RETURNS TABLE (
    p_Id UUID,
    p_NamaSubkategori VARCHAR(100),
    p_Deskripsi TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        Id AS p_Id,
        NamaSubkategori AS p_NamaSubkategori,
        Deskripsi AS p_Deskripsi
    FROM
        SIJARTA.SUBKATEGORI_JASA
    WHERE
        NamaSubkategori = nama;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION SIJARTA.show_pekerja(
    _kategori_id UUID
) RETURNS TABLE (
    PekerjaId UUID,
    NamaPekerja VARCHAR(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.Id,
        p.Nama
    FROM
        SIJARTA.PEKERJA p
    INNER JOIN
        SIJARTA.PEKERJA_KATEGORI_JASA pk ON p.Id = pk.PekerjaId
    WHERE
        pk.KategoriJasaId = _kategori_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION SIJARTA.CheckMypaySaldo()
RETURNS TRIGGER
AS $$
DECLARE 
    saldo DECIMAL(15,2);
BEGIN
    SELECT SaldoMyPay INTO saldo
    FROM SIJARTA.USER
    WHERE Id = NEW.IdPelanggan;

    IF saldo < NEW.TotalBiaya THEN
        RAISE EXCEPTION 'Saldo mypay pelanggan tidak cukup.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION SIJARTA.show_metode_bayar()
RETURNS TABLE (ListMetode VARCHAR(100)) AS $$
BEGIN
    RETURN QUERY
    SELECT Nama
    FROM SIJARTA.METODE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION SIJARTA.get_kategori_jasa()
RETURNS TABLE (
    id UUID, 
    namakategori VARCHAR,
    namasubkategori VARCHAR[]
    idsubkategori UUID[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        kj.Id AS id,
        kj.NamaKategori AS namaKategori,
        array_agg(skj.NamaSubkategori) AS namasubkategori
        array_agg(skj.id) AS idsubkategori
    FROM 
        SIJARTA.KATEGORI_JASA kj
    LEFT JOIN SIJARTA.SUBKATEGORI_JASA skj ON kj.id = skj.KategoriJasaId
    LEFT JOIN SIJARTA.PEKERJA_KATEGORI_JASA pkj ON kj.id = pkj.KategoriJasaId
    GROUP BY 
        kj.Id, kj.NamaKategori;
END;
$$ LANGUAGE plpgsql;

