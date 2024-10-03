pub mod as_str;
pub mod assert;
pub mod error;
pub mod from_bytes_repr;
pub mod print_debug;
pub mod specific;

#[cfg(feature = "network_radix")]
pub mod radix;

#[cfg(feature = "network_radix")]
pub type _Network = radix::Radix;

pub mod flattened;
#[cfg(not(feature = "network_radix"))]
mod pure;

#[cfg(not(feature = "network_radix"))]
pub type _Network = pure::Std;
