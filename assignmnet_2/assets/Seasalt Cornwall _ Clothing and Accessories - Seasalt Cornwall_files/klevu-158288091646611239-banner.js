var klevu_banner=[];function klevu_removeIneligibleBanners() { if (klevu_banner.length > 0) { var today = new Date, startDate, endDate, removeCurrent = false;today.setHours(0,0,0,0); for (var i = 0; i < klevu_banner.length; i++ ) { startDate = new Date (klevu_banner[i].startDate);removeCurrent = false;if ('undefined' !== typeof klevu_banner[i].endDate && klevu_banner[i].endDate) { endDate = new Date (klevu_banner[i].endDate);removeCurrent = (startDate > today || endDate < today); } else { removeCurrent = (startDate > today);} if (removeCurrent) { klevu_banner.splice(i, 1);i--; } } } }klevu_removeIneligibleBanners();
