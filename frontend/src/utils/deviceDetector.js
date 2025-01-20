export class DeviceDetector {
    static getDeviceType() {
        const width = window.innerWidth;
        if (width >= 1024) {
            return this.isMacBook() ? 'macbook' : 'ipad-pro';
        }
        return width >= 768 ? 'ipad' : 'mobile';
    }

    static isMacBook() {
        return /MacIntel/.test(navigator.platform) && !('ontouchend' in document);
    }

    static adjustZoom() {
        const device = this.getDeviceType();
        const zoomLevels = {
            'macbook': 1,
            'ipad-pro': 0.9,
            'ipad': 0.8,
            'mobile': 0.7
        };
        return zoomLevels[device] || 1;
    }

    static isIPad() {
        return /iPad/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }

    static getDeviceSpecs() {
        const deviceType = this.getDeviceType();
        const specs = {
            'ipad-pro': {
                zoom: 1,
                fontSize: '16px',
                padding: '24px',
                maxWidth: '1024px'
            },
            'ipad': {
                zoom: 0.9,
                fontSize: '15px',
                padding: '20px',
                maxWidth: '820px'
            },
            'macbook-pro': {
                zoom: 1.1,
                top: '50%',
                fontSize: '16px',
                padding: '30px',
                maxWidth: '1400px'
            },
            'macbook-air': {
                zoom: 1,
                fontSize: '16px',
                padding: '24px',
                maxWidth: '1200px'
            },
            'other': {
                zoom: 1,
                fontSize: '16px',
                padding: '20px',
                maxWidth: '100%'
            }
        };
        
        return specs[deviceType];
    }
} 