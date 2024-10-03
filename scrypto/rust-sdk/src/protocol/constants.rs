pub(crate) const UNSIGNED_METADATA_BYTE_SIZE_BS: usize = 3;
pub(crate) const DATA_PACKAGES_COUNT_BS: usize = 2;
pub(crate) const DATA_POINTS_COUNT_BS: usize = 3;
pub(crate) const SIGNATURE_BS: usize = 65;
pub(crate) const DATA_POINT_VALUE_BYTE_SIZE_BS: usize = 4;
pub(crate) const DATA_FEED_ID_BS: usize = 32;
pub(crate) const TIMESTAMP_BS: usize = 6;
pub(crate) const MAX_TIMESTAMP_DELAY_MS: u64 = 15 * 60 * 1000; // 15 minutes in milliseconds
pub(crate) const MAX_TIMESTAMP_AHEAD_MS: u64 = 3 * 60 * 1000; // 3 minutes in milliseconds
pub(crate) const REDSTONE_MARKER_BS: usize = 9;
pub(crate) const REDSTONE_MARKER: [u8; 9] = [0, 0, 2, 237, 87, 1, 30, 0, 0]; // 0x000002ed57011e0000
